// Step 1: Load the GEOJSON data from our earthquade data source

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
  .then(function(data) {
    console.log(data);

    // All code goes here

    // Create map variable
    var mymap = L.map('map').setView([37, -122], 8);

    // Create a base layer (look and feel)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicm1zdGVhZG1hbiIsImEiOiJjazd4eno0M2IwMjI0M21xZ3BpeXpwdzJpIn0.w7yMI6p9MWB5Od2faqK5-w'
    }).addTo(mymap);

    // Loop through the "features" array/list and create a bunch of circles based on their coordinates and magnitudes.
    var earthQuakeDataPoints = data.features;

    for (let index = 0; index < earthQuakeDataPoints.length; index++) {
      // grab each earthquake dictionary so that we can extract out its coordinates and magnitude
      var earthquake = earthQuakeDataPoints[index];

      // Grab the coordinates
      var latitude = earthquake.geometry.coordinates[1]
      var longitude = earthquake.geometry.coordinates[0]
      var coordinates = [latitude, longitude];

      // Grab the magnitude
      var magnitude = earthquake.properties.mag;

      // Create a circle using the proper properties of the earthquake
      var circle = L.circle(coordinates, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: magnitude * 10000
    }).addTo(mymap);
      
    }

  })