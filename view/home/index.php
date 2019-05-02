<script type="text/javascript">
    var marker = <?php echo json_encode($markers); ?>;
    var filter = <?php echo json_encode($filters); ?>;
    var current = <?php echo $coordinate; ?>;
    var mapnum = "<?php echo $maps[$map]["map"]; ?>";
    var mapname = "<?php echo $map; ?>";
</script>

<table class="titlebar">
    <tr>
        <td class="titlebar-topleft"></td>
        <td class="titlebar-top"></td>
        <td class="titlebar-topright"></td>
    </tr>
    <tr>
        <td class="titlebar-left"></td>
        <td>
            <?php foreach($map_groups as $group_name => $group_members): ?>
                <?php if(sizeof($group_members) == 1): ?>
                    <a href="<?php echo "{$base_url}?map={$group_members[0]}"; ?>">
                        <div class="small-button" onClick="window.location.href='<?php echo "{$base_url}?map={$group_members[0]}"; ?>';">
                            <table>
                                <tr>
                                    <td class="blue-bottom-left"></td>
                                    <td class="blue-bottom-center">
                                        <?php echo $group_name; ?>
                                    </td>
                                    <td class="blue-bottom-right"></td>
                                </tr>
                            </table>
                        </div>
                    </a>
                <?php else: $group_name_formatted = strtolower(str_replace(" ", "-", preg_replace('/[^\da-z ]/i', '', $group_name))); ?>
                    <a href="javascript:switchView('<?php echo $group_name_formatted; ?>');">
                        <div id="<?php echo $group_name_formatted; ?>-button" class="small-button <?php if($active_group == $group_name) echo 'highlighted'; ?>" onClick="switchView('<?php echo $group_name_formatted; ?>');">
                            <table>
                                <tr>
                                    <td class="blue-bottom-left"></td>
                                    <td class="blue-bottom-center">
                                        <?php echo $group_name; ?>
                                    </td>
                                    <td class="blue-bottom-right"></td>
                                </tr>
                            </table>
                        </div>
                    </a>
                <?php endif; ?>
            <?php endforeach; ?>
            <?php foreach($map_groups as $group_name => $group_members): ?>
                <?php if(sizeof($group_members) > 1): $group_name_formatted = strtolower(str_replace(" ", "-", preg_replace('/[^\da-z ]/i', '', $group_name))); ?>
                    <div class="map-selection" id="<?php echo $group_name_formatted; ?>-selections" <?php if($active_group != $group_name) echo 'style="display:none"'; ?>>
                        <?php foreach($group_members as $key => $item): ?>
                            <span <?php if($map == $item) echo 'class="active-map-selection"'; ?>>
                                <?php if(isset($maps[$item]["map"])): ?><a href="<?php echo "{$base_url}?map={$item}"; ?>"><?php endif; ?>
                                    <?php echo $maps[$item]["display_name"]; ?>
                                <?php if(isset($maps[$item]["map"])): ?></a><?php endif; ?>
                            </span><?php if($key != sizeof($group_members) - 1): ?> |<?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </td>
        <td class="titlebar-right"></td>
    </tr>
    <tr>
        <td class="titlebar-bottomleft"></td>
        <td class="titlebar-bottom"></td>
        <td class="titlebar-bottomright"></td>
    </tr>
</table>
<br>
Use the map below as a tool to send maps of specific locations to your friends or to as a guide to find map revealers,
teleport NPCs, and other points of interest.
<br>
<br>
<table onselectstart="return false" ondragstart="return false">
    <tr>
        <td>
            <div class="map-enlarged" id="smallmap" style="position: relative;" oncontextmenu="addmarker(event,0); return false;">
                <div id="markerssmall" style="position: absolute; z-index: 1;"></div>
                <div class="map-enlarged-background" style="position: absolute; top: 0px; left: 0px;"></div>
                <div class="map-enlarged-background-gradient" oncontextmenu="return false"></div>
                <table>
                    <tr>
                        <td class="map-enlarged-image" id="map1"></td>
                        <td class="map-enlarged-image" id="map2"></td>
                        <td class="map-enlarged-image" id="map3"></td>
                    </tr>
                    <tr>
                        <td class="map-enlarged-image" id="map4"></td>
                        <td class="map-enlarged-image" id="map5"></td>
                        <td class="map-enlarged-image" id="map6"></td>
                    </tr>
                    <tr>
                        <td class="map-enlarged-image" id="map7"></td>
                        <td class="map-enlarged-image" id="map8"></td>
                        <td class="map-enlarged-image" id="map9"></td>
                    </tr>
                </table>
            </div>
            <a id="link" href="" style="text-decoration: none;">
                <table width="100%">
                    <tbody>
                        <tr>
                            <td class="lightblue-button-top-left"></td>
                            <td class="lightblue-button-top">
                                <a id="link2" href="" style="color: #fff; text-decoration: none;">Link to this Map</a>
                            </td>
                            <td class="lightblue-button-top-right"></td>
                        </tr>
                        <tr>
                            <td class="lightblue-button-bottom-left"></td>
                            <td class="lightblue-button-bottom"></td>
                            <td class="lightblue-button-bottom-right"></td>
                        </tr>
                    </tbody>
                </table>
            </a>
            <div class="release">
                Use the above link to share this map along with the markers you've placed on it.
            </div>
        </td>
        <td style="vertical-align: top; padding-left: 16px;">
            <div class="bigmap-background" style="position: relative;" onclick="jumpmap(event)" oncontextmenu="addmarker(event,1)">
                <div id="bigmap" style="float: left; background: url(img/map/<?php echo $maps[$map]["map"]; ?>.jpg) no-repeat;">
                    <div id="markersbig" style="position: absolute; z-index: 1;"></div>
                    <div style="position: absolute; z-index: 2;">
                        <img oncontextmenu="return false;" id="mapbox" src="img/50p_white.png" style="position: absolute; display: none;">
                    </div>
                </div>
                <div class="map-gradient" oncontextmenu="return false"></div>
                <div class="instructions" oncontextmenu="return false">
                    Click on the map or use the W, A, S, and D keys to position the zoomed in map on the left.<br><br>
                    Right click on either map to place a marker and right click on a marker to delete it.<br><br>
                    Marker Style:
                    <br>
                    <div id="selectmarker0" class="marker-style-selected"><a href="javascript:void(0)" onclick="changemarker(0);"><img src="img/marker0.png"></a></div>
                    <div id="selectmarker1" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(1);"><img src="img/marker1.png"></a></a></div>
                    <div id="selectmarker2" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(2);"><img src="img/marker2.png"></a></div>
                    <div id="selectmarker3" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(3);"><img src="img/marker3.png"></a></div>
                    <div id="selectmarker4" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(4);"><img src="img/marker4.png"></a></div>
                    <div id="selectmarker5" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(5);"><img src="img/marker5.png"></a></div>
                    <div id="selectmarker6" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(6);"><img src="img/marker6.png"></a></div>
                    <div id="selectmarker7" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(7);"><img src="img/marker7.png"></a></div>
                    <div id="selectmarker8" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(8);"><img src="img/marker8.png"></a></div>
                    <div id="selectmarker9" class="marker-style"><a href="javascript:void(0)" onclick="changemarker(9);"><img src="img/marker9.png"></a></div>
                    <div class="filters">
                        <a href="javascript:void(0)" onclick="changefilter(0);">
                            <div id="filter0" class="filter-<?php echo $filters[0] ? "on" : "off" ?>">Show Markers</div>
                        </a>
                        <a href="javascript:void(0)" onclick="changefilter(1);">
                            <div id="filter1" class="filter-<?php echo $filters[1] ? "on" : "off" ?>">Show Map Revealers</div>
                        </a>
                        <a href="javascript:void(0)" onclick="changefilter(2);">
                            <div id="filter2" class="filter-<?php echo $filters[2] ? "on" : "off" ?>">Show Teleporters</div>
                        </a>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</table>