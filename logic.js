var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1980-01-19&endtime=" +
"1980-02-20&maxlongitude=180&minlongitude=-180&maxlatitude=85&minlatitude=-85";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  var tiny = {
    radius: 3,
    fillColor: "#B7F34D",
    color: "#585858",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
  
  var small = {
    radius: 5,
    fillColor: "#E1F34D",
    color: "#585858",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  var medium = {
    radius: 7,
    fillColor: "#F3DB4D",
    color: "#585858",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  var large = {
    radius: 9,
    fillColor: "#F3BA4D",
    color: "#585858",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  var yikes = {
    radius: 11,
    fillColor: "#F0A76B",
    color: "#585858",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  var nope = {
    radius: 20,
    fillColor: "#F06B6B",
    color: "#585858",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };


  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      if (feature.properties.mag < 1.0) { 
        return L.circleMarker(latlng, tiny).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }
      else if (feature.properties.mag < 2.0) {
        return L.circleMarker(latlng, small).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }
      else if (feature.properties.mag < 3.0){
        return L.circleMarker(latlng, medium).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"); 
      }
      else if (feature.properties.mag < 4.0){
        return L.circleMarker(latlng, large).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"); 
      }
      else if (feature.properties.mag < 5.0){
        return L.circleMarker(latlng, yikes).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"); 
      }
      else {
        return L.circleMarker(latlng, nope).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"); 
      }
    }  
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });

  L.control.layers(overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
