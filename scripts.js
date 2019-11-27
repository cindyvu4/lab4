var mapbox =
mapboxgl.accessToken = 'pk.eyJ1IjoiY2luZHl2dTQiLCJhIjoiY2sydzVleGJ3MGNkNDNpcW1odG1icDEwciJ9._9FHgo3Qa682z450P9Xz_w';

//The map variable, set initial style, center/zoom
var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/cindyvu4/ck3ffgbpy0avs1cmotroguf3s', // stylesheet location
		center: [-90,70], // starting position [lat, ln]
		zoom: 0 // starting zoom
});

//on map load, run function to load the geojson
map.on('load', function(){
//add a source layer for earthquakes
	map.addSource('earthquakes', {
				"type": "geojson",
				"data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
		});
	//add the earthquakes to the map
		map.addLayer({
			"id":"earthquakes",
			"type":"circle",
			"source":"earthquakes",
			"paint": {
					'circle-radius': 6,
					'circle-color': 'maroon'
			}
		});
// Add zoom and rotation controls to the map.
	map.addControl(new mapboxgl.NavigationControl());
});

//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
map.on('click', 'earthquakes', function (e) {
			//1. set the coordinates of the popup
			var coordinates = e.features[0].geometry.coordinates;
			//2. create the information that will display in the popup
			var description = "<h3>"+e.features[0].properties.place+"</h3>" + "Magnitude: " + e.features[0].properties.mag + "<br>Time: " + e.features[0].properties.time + "<br> Find out more: " + "<a target='_blank' href=" + e.features[0].properties.url + ">Here</a>";
			//3. make the popup
			new mapboxgl.Popup()
							.setLngLat(coordinates)
							.setHTML(description)
							.addTo(map);
});

//adding a switch to turn on and off layer
var toggleableLayerIds = ["earthquakes"];

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement("a");
  link.href = "#";
  link.className = "active";
  link.textContent = id;

  link.onclick = function(e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, "visibility");

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = "";
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
    }
  };

  var layers = document.getElementById("navmenu");
  layers.appendChild(link);
}


//2nd map
var googlemap;
function initMap() {
		googlemap = new google.maps.Map(document.getElementById('googlemap'), {
		center: new google.maps.LatLng(-90,0),
		zoom: 0,
		mapTypeId: 'satellite',
	});


var kmlLayer = new google.maps.KmlLayer({
    url: "https://fsapps.nwcg.gov/data/kml/conus_latest_lg_incidents.kml",
    suppressInfoWindows: false,
		preserveViewport: false,
    map: googlemap
  });
}
