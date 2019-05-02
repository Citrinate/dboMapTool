<?php

class InteractiveMap
{
    private $_default_map = "world";
    private $_map_groups = array(
        "World Map" => array("world"),

        "World Zones" => array(
            "fearland", "franfran-desert-north", "guild-dojo", "kame-house", "karin-forest",
            "mushroom-rocks-north", "mushroom-rocks-south", "papaya-island", "porunga-rocks-north",
            "porunga-rocks-south", "west-city", "westlands", "yahhoi-east", "yahhoi-west"
        ),

        "Dungeons" => array(
            "dragon-cave", "fuel-research-plant", "hoi-poi-stone-mine", "pilafs-castle",
            "pilafs-museum", "red-pants-army-hq", "red-pants-armys-robotics-facility",
            "red-ribbon-army-hq-ruins", "red-ribbon-army-underground-base-ruins", "secret-waterfall-cave",
            "underground-waterway", "yahhoi-fort"
        ),

        "TMQs" => array("tmq-1", "tmq-2-part-1","tmq-2-part-3", "tmq-3-day", "tmq-3-night", "tmq-4", "tmq-5", "tmq-6"),

        "TLQs" => array("tlq-1", "tlq-2", "tlq-3")
    );

    private $_valid_maps = array(
        "world" => array(
            "display_name" => "World",
            "map" => "world"
        ),

        "fearland" => array(
            "display_name" => "Fearland",
            "map" => "fearland"
        ),

        "westlands" => array(
            "display_name" => "Westlands",
            "map" => "westlands"
        ),

        "mushroom-rocks-north" => array(
            "display_name" => "Mushroom Rocks (North)",
            "map" => "mushroom_rocks_north"
        ),

        "mushroom-rocks-south" => array(
            "display_name" => "Mushroom Rocks (South)",
            "map" => "mushroom_rocks_south"
        ),

        "yahhoi-east" => array(
            "display_name" => "Yahhoi (East)",
            "map" => "yahhoi_east"
        ),

        "yahhoi-west" => array(
            "display_name" => "Yahhoi (West)",
            "map" => "yahhoi_west"
        ),

        "porunga-rocks-north" => array(
            "display_name" => "Porunga Rocks (North)",
            "map" => "porunga_rocks_north"
        ),

        "porunga-rocks-south" => array(
            "display_name" => "Porunga Rocks (South)",
            "map" => "porunga_rocks_south"
        ),

        "franfran-desert-north" => array(
            "display_name" => "Franfran Desert (North)",
            "map" => "franfran_desert_north"
        ),

        "karin-forest" => array(
            "display_name" => "Karin Forest",
            "map" => "karin_forest"
        ),

        "west-city" => array(
            "display_name" => "West City",
            "map" => "west_city"
        ),

        "world-martial-arts-tournament-city"=> array(
            "display_name" => "World Martial Arts Tournament City",
            "map" => "world_martial_arts_tournament_city"
        ),

        "kame-house" => array(
            "display_name" => "Kame House",
            "map" => "kame_house"
        ),

        "papaya-island" => array(
            "display_name" => "Papaya Island",
            "map" => "papaya_island"
        ),

        "guild-dojo" => array(
            "display_name" => "Guild Dojo",
            "map" => "guild_dojo"
        ),

        "yahhoi-fort" => array(
            "display_name" => "Yahhoi Fort",
            "map" => "yahhoi_fort"
        ),

        "dragon-cave" => array(
            "display_name" => "Dragon Cave",
            "map" => "dragon_cave"
        ),

        "underground-waterway" => array(
            "display_name" => "Underground Waterway",
            "map" => "underground_waterway"
        ),

        "red-ribbon-army-underground-base-ruins" => array(
            "display_name" => "Red Ribbon Army Underground Base Ruins",
            "map" => "red_ribbon_army_underground_base_ruins"
        ),

        "red-ribbon-army-hq-ruins" => array(
            "display_name" => "Red Ribbon Army HQ Ruins",
            "map" => "red_ribbon_army_hq_ruins"
        ),

        "tmq-1" => array(
            "display_name" => "TMQ 1",
            "map" => "tmq_1"
        ),

        "tmq-2-part-1" => array(
            "display_name" => "TMQ 2 (Part 1)",
            "map" => "tmq_2_part_1"
        ),

        "tmq-2-part-2" => array(
            "display_name" => "TMQ 2 (Part 2)",
            "map" => "kame_house"
        ),

        "tmq-2-part-3" => array(
            "display_name" => "TMQ 2 (Part 3)",
            "map" => "tmq_1"
        ),

        "tmq-3-day" => array(
            "display_name" => "TMQ 3 (Day)",
            "map" => "tmq_3_day"
        ),

        "tmq-3-night" => array(
            "display_name" => "TMQ 3 (Night)",
            "map" => "tmq_3_night"
        ),

        "tmq-4" => array(
            "display_name" => "TMQ 4",
            "map" => "tmq_4"
        ),

        "tmq-5" => array(
            "display_name" => "TMQ 5",
            "map" => "tmq_5"
        ),

        "tmq-6" => array(
            "display_name" => "TMQ 6",
            "map" => "tmq_6"
        ),

        "tlq-1" => array(
            "display_name" => "TLQ 1",
            "map" => "tlq_1"
        ),

        "tlq-2" => array(
            "display_name" => "TLQ 2",
            "map" => "tlq_2"
        ),

        "tlq-3" => array(
            "display_name" => "TLQ 3",
            "map" => "tlq_3"
        ),

        "fuel-research-plant" => array(
            "display_name" => "Full Research Plant",
            "map" => null
        ),

        "hoi-poi-stone-mine" => array(
            "display_name" => "Hoi Poi Stone Mine",
            "map" => null
        ),

        "pilafs-castle" => array(
            "display_name" => "Pilaf's Castle",
            "map" => null
        ),

        "pilafs-museum" => array(
            "display_name" => "Pilaf's Museum",
            "map" => null
        ),

        "red-pants-army-hq" => array(
            "display_name" => "Red Pants Army HQ",
            "map" => null
        ),

        "red-pants-armys-robotics-facility" => array(
            "display_name" => "Red Pants Army's Robotics Facility",
            "map" => null
        ),

        "secret-waterfall-cave" => array(
            "display_name" => "Secret Waterfall Cave",
            "map" => null
        )
    );

    // -----------------------------------------------------------------------------------------------------------------

    /**
     * @return string
     */
    private function _sanitizeMap()
    {
        if(isset($_GET["map"])) {
            $map = $_GET["map"];

            if(isset($this->_valid_maps[$map]) && isset($this->_valid_maps[$map]["map"])) {
                return $map;
            }
        }

        return $this->_default_map;
    }


    // -----------------------------------------------------------------------------------------------------------------

    /**
     *
     */
    private function _sanitizeMarkers()
    {
        if(isset($_GET["markers"])) {
            $markers = (string) $_GET["markers"];

            if(is_numeric($markers) && strlen($markers) % 11 == 0) {
                $temp = array();
                $marker_count = 0;
                for($i = 0; $i < strlen($markers); $i+=11) {
                    $temp[$marker_count++] = array(
                        intval(substr($markers, $i + 1, 5)), // x coordinate
                        intval(substr($markers, $i + 6, 5)), // y coordinate
                        intval($markers[$i]),                // marker type
                        0                                    // necessary flag so that the script knows this marker isn't deleted
                    );
                }

                return $temp;
            }
        }

        return array();
    }

    // -----------------------------------------------------------------------------------------------------------------

    /**
     *
     */
    private function _sanitizeCoordinate()
    {
        if(isset($_GET["coord"])) {
            $coord = $_GET["coord"];

            if(is_numeric($coord)) {
                return $coord;
            }
        }

        return 0;
    }


    // -----------------------------------------------------------------------------------------------------------------

    /**
     * @param $map
     * @return array
     */
    private function _sanitizeFilters($map)
    {
        if(isset($_GET["filter"])) {
            $filter = (string) $_GET["filter"];

            if(is_numeric($filter) && strlen($filter) == 3) {
                $temp = array();
                for($i = 0; $i < strlen($filter); $i++) {
                    if($filter[$i] == 0 || $filter[$i] == 1) {
                        $temp[$i] = intval($filter[$i]);
                    }
                }

                if(sizeof($temp) == 3) {
                    return $temp;
                }
            }
        }

        return $map == "world" ? array(1,0,0) : array(1,1,1);
    }

    // -----------------------------------------------------------------------------------------------------------------

    /**
     * @param $map
     * @return int|null|string
     */
    private function _getActiveGroup($map)
    {
        $first_group = null;
        foreach($this->_map_groups as $group => $members) {
            if(sizeof($members) > 1) {
                if(in_array($map, $members)) {
                    return $group;
                } else if(!isset($first_group)) {
                    $first_group = $group;
                }
            }
        }

        return $first_group;
    }

    // -----------------------------------------------------------------------------------------------------------------

    /**
     *
     */
    public function buildPage()
    {
        $map_groups = $this->_map_groups;
        $maps = $this->_valid_maps;
        $map = $this->_sanitizeMap();
        $markers = $this->_sanitizeMarkers();
        $coordinate = $this->_sanitizeCoordinate();
        $filters = $this->_sanitizeFilters($map);
        $active_group = $this->_getActiveGroup($map);
        $base_url = strtok($_SERVER["REQUEST_URI"],'?');

        REQUIRE "view/_template/header.php";
        REQUIRE "view/home/index.php";
        REQUIRE "view/_template/footer.php";
    }
}

$tool = new InteractiveMap();
$tool->buildPage();