var map = [];
var bigmap;
var smallmap;
var mapbox;
var markerssmall;
var markersbig;
var notes;
var link;
var markertype = 0;
var add = 0;
var markernum = 0;
var url = "";
var maplists = [];
var maplistselect = [];
var holdup = 0;
var keydown = 0;
var realcurrent = 0;
var tempminx = 0;
var tempminy = 0;
var tempmaxx = 0;
var tempmaxy = 0;
var site_url = top.location.href.split('?')[0];
var frame_url = window.location.href.split('?')[0];


function setRealcurrent()
	{
	tempcurrent = current;
	row = Math.floor(tempcurrent/width);
	tempcurrent = tempcurrent % width;
	
	realcurrent = initial + tempcurrent + row * realwidth;
	}

function movemapbox()
	{
	mapbox.style.top = (parseInt((Math.ceil(current/width) - 1) * (mapboxheight/3) + mapy)) + "px";
	mapbox.style.left = (parseInt(((current % width) - 1) * (mapboxheight/3) + mapx)) + "px";
	}
	
function movemap(up, down, left, right)
	{
	if(mapbox.style.display == "inline"){
	if(up == 2 && current <= width * 2) up = 1;
	if(right == 2 && current % width == width - 2) right = 1;
	if(left == 2 && current % width == 2) left = 1;
	if(down == 2 && current >= max - width * 3) down = 1;

	if(!(up && current <= width) 
		&& !(right && current % width == width - 2)
		&& !(left && current % width == 1)
		&& !(down && current >= max - width * 3)){
		
		current = current - up * width + right - left + down * width;
		
		setRealcurrent();
		map[0].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent) + ".jpg)";
		map[1].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+1) + ".jpg)";
		map[2].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+2) + ".jpg)";
		map[3].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth) + ".jpg)";
		map[4].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth+1) + ".jpg)";
		map[5].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth+2) + ".jpg)";
		map[6].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2) + ".jpg)";
		map[7].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2+1) + ".jpg)";
		map[8].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2+2) + ".jpg)";
		
		movemapbox();
		updateurl(1);
		refreshmarkers(0);
	}}}
	
function checkKey(e)
	{
	if(keydown == 0)
		{
		var key = e.keyCode || e.which;//e.keyCode? e.keyCode : e.charCode;
		key = String.fromCharCode(key);
		if(key == "w") movemap(1,0,0,0);
		else if(key == "a") movemap(0,0,1,0);
		else if(key == "s") movemap(0,1,0,0);
		else if(key == "d") movemap(0,0,0,1);
		else if(key == "0") changemarker(0);
		else if(key == "1") changemarker(1);
		else if(key == "2") changemarker(2);
		else if(key == "3") changemarker(3);
		else if(key == "4") changemarker(4);
		else if(key == "5") changemarker(5);
		else if(key == "6") changemarker(6);
		else if(key == "7") changemarker(7);
		else if(key == "8") changemarker(8);
		else if(key == "9") changemarker(9);
		keydown = 1;
		}
	}
	
function jumpmap(event)
	{	
	pos = findPos(bigmap);
	if (event.pageX === undefined)
		{
		posx = event.clientX + document.documentElement.scrollLeft - pos[0];
		posy = event.clientY + document.documentElement.scrollTop - pos[1];
		}
	else
		{
		posx = event.pageX - pos[0];
		posy = event.pageY - pos[1];
		}
	
	if(posx >= mapx && posy >= mapy && posx < (mapmaxx + mapx) && posy <= (mapmaxy + mapy))
		{

		posx -= mapx;
		posy -= mapy;
		current = (parseInt(posy/mapmaxy * max/width) * width + parseInt(posx/mapmaxx * width - 1)) - width + 1;
		if(current % width == width - 1) current -= 1;
		else if(current % width == 0) current += 1;
		while(current > max - (width * 2)) current -= width;
		while(current < 0) current += width;
		
		setRealcurrent();
		map[0].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent) + ".jpg)";
		map[1].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+1) + ".jpg)";
		map[2].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+2) + ".jpg)";
		map[3].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth) + ".jpg)";
		map[4].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth+1) + ".jpg)";
		map[5].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth+2) + ".jpg)";
		map[6].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2) + ".jpg)";
		map[7].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2+1) + ".jpg)";
		map[8].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2+2) + ".jpg)";
		
		movemapbox();
		updateurl(1);
		refreshmarkers(0);
		}
	}
	
function findPos(obj)
	{
	var curleft = curtop = 0;

	if (obj.offsetParent)
		{
			do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		return [curleft,curtop];
		}
	}
	
function addmarker(event, map)
	{
	if(add && filter[0] && markernum != 25 && (event.target || event.srcElement).id != "mapbox") {
	
	if(map)
		{
		pos = findPos(bigmap);
		if (event.pageX === undefined)
			{
			posx = event.clientX + document.documentElement.scrollLeft - pos[0];
			posy = event.clientY + document.documentElement.scrollTop - pos[1];
			}
		else
			{
			posx = event.pageX - pos[0];
			posy = event.pageY - pos[1];
			}
		
		if(posx >= mapx && posy >= mapy && posx < (mapmaxx + mapx) && posy <= (mapmaxy + mapy))
			{
			
			markerbigx = posx - 5;
			markerbigy = posy - 5;
			posx -= mapx;
			posy -= mapy;
			markerx = parseInt(posx/mapmaxx * width * 128) + 1;
			markery = parseInt(posy/mapmaxy * max/width * 128) + 1;
			markersbig.innerHTML += '<img id="marker' + marker.length + '" oncontextmenu="add = 0; delmarker(' + marker.length + '); return false;" src="img/marker' + markertype + '.png" style="position: absolute; top: ' + markerbigy +'px; left: ' + markerbigx +'px;">';
			marker[marker.length] = [markerx, markery, markertype, 0];
			markernum++;
			refreshmarkers(0);
			updateurl(1);
			}
		}
	else
		{
		pos = findPos(smallmap);
		if (event.pageX === undefined)
			{
			posx = event.clientX + document.documentElement.scrollLeft - pos[0];
			posy = event.clientY + document.documentElement.scrollTop - pos[1];
			}
		else
			{
			posx = event.pageX - pos[0];
			posy = event.pageY - pos[1];
			}
		
		if(posx > 3 && posx <= 379 && posy > 6 && posy <= 376)
			{
			markerx = posx + ((current % width) - 1) * 128;
			markery = posy + (Math.ceil(current / width) - 1) * 128;
			pos = findPos(bigmap);
			markerbigx = parseInt((markerx/(width*128)) * (mapmaxx)) + mapx - 5; //+ pos[0] - 5;
			markerbigy = parseInt((markery/((max/width) * 128)) * (mapmaxy)) + mapy - 5; //+ pos[1] - 5;
			markersbig.innerHTML += '<img id="marker' + marker.length + '" oncontextmenu="add = 0; delmarker(' + marker.length + '); return false;" src="img/marker' + markertype + '.png" style="position: absolute; top: ' + markerbigy +'px; left: ' + markerbigx +'px;">';
			marker[marker.length] = [markerx, markery, markertype, 0];
			markernum++;
			refreshmarkers(0);
			updateurl(1);
			}
		}
	}
	else if(markernum == 25) alert("You've reached the maximum number of markers you can place on the map.");
	else add = 1;
	}
	
function delmarker(num)
	{
	small = document.getElementById('smallmarker' + num);
	if(small) small.style.display = "none";
	document.getElementById('marker' + num).style.display = "none";
	marker[num][3] = 1;
	refreshmarkers(0);
	updateurl(1);
	markernum--;
	}
	
function refreshmarkers(all)
	{
	if(holdup == 0) {
	holdup = 1;
	temp = '<img src="img/0p_white.png" height="10px" width="10px">';
	temp2 = "";
	pos = findPos(smallmap);
	pos2 = findPos(bigmap);
	markerxmin = ((current % width) - 1) * 128;
	markerymin = (Math.ceil(current / width) - 1) * 128;
	markerxmax = markerxmin + 128 * 3;
	markerymax = markerymin + 128 * 3;
	
	if(filter[0]) { for(i = 0; i < marker.length; i++)
		{
		if(!marker[i][3]) {
		if(
			marker[i][0] >= (markerxmin + 4) 
			&& marker[i][0] <= (markerxmax - 4)
			&& marker[i][1] >= (markerymin + 7) 
			&& marker[i][1] <= (markerymax - 7)
			)
			{
			markerx = marker[i][0] - markerxmin - 5;
			markery = marker[i][1] - markerymin -5;
			temp += '<img id="smallmarker' + i + '" oncontextmenu="add = 0; delmarker(' + i + '); return false;" src="img/marker' + marker[i][2] + '.png" style="position: absolute; top: ' + markery +'px; left: ' + markerx +'px;">';
			}
			
		if(all)
			{
			markerbigx = parseInt((marker[i][0]/(width*128)) * (mapmaxx)) + mapx - 5;
			markerbigy = parseInt((marker[i][1]/((max/width) * 128)) * (mapmaxy)) + mapy - 5;
			temp2 += '<img id="marker' + i + '" oncontextmenu="add = 0; delmarker(' + i + '); return false;" src="img/marker' + marker[i][2] + '.png" style="position: absolute; top: ' + markerbigy +'px; left: ' + markerbigx +'px;">';
			}
		}}}
		
	if(filter[1]) { for(i = 0; i < revealers.length; i++)
		{
		if(revealers[i][0] >= (markerxmin + 4) && revealers[i][0] <= (markerxmax - 4) && revealers[i][1] >= (markerymin + 7) && revealers[i][1] <= (markerymax - 7))
			{
			markerx = revealers[i][0] - markerxmin - 5;
			markery = revealers[i][1] - markerymin - 5;
			temp += '<img oncontextmenu="return false;" src="img/markerrevealer.png" style="position: absolute; top: ' + markery +'px; left: ' + markerx +'px;">';
			}
			
		if(all)
			{
			if(initial != 0)
				{
				if(revealers[i][0] > tempmaxx || revealers[i][0] < tempminx || revealers[i][1] > tempmaxy || revealers[i][1] < tempminy) continue;
				}

			markerbigx = parseInt((revealers[i][0]/(width*128)) * (mapmaxx)) + mapx - 5;
			markerbigy = parseInt((revealers[i][1]/((max/width) * 128)) * (mapmaxy)) + mapy - 5;			
			temp2 += '<img oncontextmenu="return false;" src="img/markerrevealer.png" style="position: absolute; top: ' + markerbigy +'px; left: ' + markerbigx +'px;">';
			}
		}}
		
	if(filter[2]) { for(i = 0; i < teleports.length; i++)
		{
		if(teleports[i][0] >= (markerxmin + 4) && teleports[i][0] <= (markerxmax - 4) && teleports[i][1] >= (markerymin + 7) && teleports[i][1] <= (markerymax - 7))
			{
			markerx = teleports[i][0] - markerxmin - 6;
			markery = teleports[i][1] - markerymin - 6;
			temp += '<img oncontextmenu="return false;" src="img/markerteleport.png" style="position: absolute; top: ' + markery +'px; left: ' + markerx +'px;">';
			}
			
		if(all)
			{
			if(initial != 0)
				{
				if(teleports[i][0] > tempmaxx || teleports[i][0] < tempminx || teleports[i][1] > tempmaxy || teleports[i][1] < tempminy) continue;
				}
			
			markerbigx = parseInt((teleports[i][0]/(width*128)) * (mapmaxx)) + mapx + - 6;
			markerbigy = parseInt((teleports[i][1]/((max/width) * 128)) * (mapmaxy)) + mapy - 6;
			temp2 += '<img oncontextmenu="return false;" src="img/markerteleport.png" style="position: absolute; top: ' + markerbigy +'px; left: ' + markerbigx +'px;">';
			}
		}}
		
	markerssmall.innerHTML = temp;
	if(all) markersbig.innerHTML = temp2;
	holdup = 0;
	}}
	
function changemarker(num)
	{
	document.getElementById('selectmarker' + markertype).className = "marker-style";
	markertype = num;
	document.getElementById('selectmarker' + num).className = "marker-style-selected";
	}
	
function changefilter(num)
	{
	if(filter[num] != 1)
		{
		document.getElementById('filter' + num).className = "filter-on";
		filter[num] = 1;
		}
	else
		{
		document.getElementById('filter' + num).className = "filter-off";
		filter[num] = 0;
		}
	
	refreshmarkers(1);
	updateurl(1);
	}
	
function updateurl(changetitle)
	{
	temp = "?tool=Map&map=" + mapname;
	temp2 = "";
	for(i = 0; i < filter.length; i++)
		{
		temp2 += filter[i];
		}
	temp += "&filter=" + temp2;
    temp += "&coord=" + current;
	if(marker.length != 0)
		{
		temp2 = "";
		num = 0
		for(i = 0; i < marker.length; i++)
			{
			if(marker[i][3] == 0)
				{
				temp2 += marker[i][2];
				
				for(j = 0; j < 2; j++)
					{
					temp3 = "" + marker[i][j];
					for(k = 0; k < 5 - temp3.length; k++) temp2 += "0";
					temp2 += marker[i][j];
					}
				
				num++;
				}
			}
		if(num != 0)
            {
            temp += "&markers=" + temp2;
            }
		}
	
	link.href = temp;
	link2.href = site_url + temp;
	if(changetitle == 1) top.history.replaceState({ state: "bar" }, document.title, site_url + temp);
	}

function showmaps(num)
	{
	if(maplists[num].style.display == "block") { maplists[num].style.display = "none"; maplistselect[num].style.fontStyle = "normal"; refreshmarkers(1); }
	else
		{
		for(i = 0; i < maplists.length; i++) { maplists[i].style.display = "none"; maplistselect[i].style.fontStyle = "normal"; }
		maplists[num].style.display = "block";
		maplistselect[num].style.fontStyle = "italic"; 
		refreshmarkers(1);
		}
	}
	
function init()
	{
	maplists[0] = document.getElementById('maplist0');
	maplists[1] = document.getElementById('maplist1');
	maplists[2] = document.getElementById('maplist2');
	maplists[3] = document.getElementById('maplist3');
	maplistselect[0] = document.getElementById('mapselect0');
	maplistselect[1] = document.getElementById('mapselect1');
	maplistselect[2] = document.getElementById('mapselect2');
	maplistselect[3] = document.getElementById('mapselect3');
	map[0] = document.getElementById('map1');
	map[1] = document.getElementById('map2');
	map[2] = document.getElementById('map3');
	map[3] = document.getElementById('map4');
	map[4] = document.getElementById('map5');
	map[5] = document.getElementById('map6');
	map[6] = document.getElementById('map7');
	map[7] = document.getElementById('map8');
	map[8] = document.getElementById('map9');
	
	if(typeof realwidth !== "number") realwidth = width;
	if(typeof initial !== "number") initial = 0;
	else 
		{
		initial -= 1;
		tempminx = initial % realwidth * 128;
		tempmaxx = tempminx + width * 128;
		tempminy = Math.floor(initial/realwidth) * 128;
		tempmaxy = tempminy + max/width * 128;
		
		for(i = 0; i < revealers.length; i++)
			{
			revealers[i][0] -= tempminx;
			revealers[i][1] -= tempminy;
			}
			
		for(i = 0; i < teleports.length; i++)
			{
			teleports[i][0] -= tempminx;
			teleports[i][1] -= tempminy;
			}
			
		tempminx = 0;
		tempmaxx = width * 128;
		tempminy = 0;
		tempmaxy = max/width * 128;
		}
	if(typeof realmap != "undefined") mapnum = realmap;
	
	if(max == 9) current = 1;
	else
		{
		if(current == 0) {
            current = (Math.floor(Math.random() * (width - 2)) + 1) * (Math.floor(Math.random() * (max/width - 2)) + 1);
        } else if(current > max - 2 - width * 2) {
            current = max - 2 - width * 2;
        } else if(current < 0) {
            current = 1;
        }

		if(current % width == width - 1) current -= 1;
		else if(current % width == 0) current += 1;
		}
	
	setRealcurrent();
	map[0].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent) + ".jpg)";
	map[1].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+1) + ".jpg)";
	map[2].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+2) + ".jpg)";
	map[3].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth) + ".jpg)";
	map[4].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth+1) + ".jpg)";
	map[5].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth+2) + ".jpg)";
	map[6].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2) + ".jpg)";
	map[7].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2+1) + ".jpg)";
	map[8].style.backgroundImage = "url(img/minimap/" + mapnum + "/" + (realcurrent+realwidth*2+2) + ".jpg)";
	
	bigmap = document.getElementById('bigmap');
	smallmap = document.getElementById('smallmap');
	mapbox = document.getElementById('mapbox');
	link = document.getElementById('link');
	link2 = document.getElementById('link2');
	markerssmall = document.getElementById('markerssmall');
	markersbig = document.getElementById('markersbig');
	
	if(mapboxheight != 0) mapbox.height = mapbox.width = mapboxheight = 384/(width * 128) * mapmaxx;
	else { mapbox.height = mapboxheight; mapbox.width = mapboxheight; }
	
	movemapbox();
	mapbox.style.display = "inline";
	updateurl(1);
	refreshmarkers(1);
	add = 1;
	
	document.onkeypress = function (event){ event = event || window.event; return checkKey(event); }
	document.onkeyup = function (){ keydown = 0; }
	}
	
function switchView(elementname)
	{
	var element = document.getElementById(elementname + "-button");
	var elementlink = document.getElementById(elementname + "-selections");
	var world_zone_button = document.getElementById("world-zones-button");
	var world_zone_selections = document.getElementById("world-zones-selections");
	var dungeon_button = document.getElementById("dungeons-button");
	var dungeon_selections = document.getElementById("dungeons-selections");
	var tmq_button = document.getElementById("tmqs-button");
	var tmq_selections = document.getElementById("tmqs-selections");
	var tlq_button = document.getElementById("tlqs-button");
	var tlq_selections = document.getElementById("tlqs-selections");
	
	if(world_zone_button != null) world_zone_button.setAttribute("class", "small-button");
	if(world_zone_selections != null) world_zone_selections.style.display = "none";
	if(dungeon_button != null) dungeon_button.setAttribute("class", "small-button");
	if(dungeon_selections != null) dungeon_selections.style.display = "none";
	if(tmq_button != null) tmq_button.setAttribute("class", "small-button");
	if(tmq_selections != null) tmq_selections.style.display = "none";
	if(tlq_button != null) tlq_button.setAttribute("class", "small-button");
	if(tlq_selections != null) tlq_selections.style.display = "none";
	if(element != null) element.setAttribute("class", "small-button highlighted");
	if(elementlink != null) elementlink.style.display = "block";
	}