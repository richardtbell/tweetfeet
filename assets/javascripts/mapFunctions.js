$(function() {


var strictBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(50.345460, -7.844238),
  new google.maps.LatLng(58.470721, 1.834473)
  ),
  myCities = {
      'London': new google.maps.LatLng(51.507351 , -0.127758),
      'Aberdeen': new google.maps.LatLng(57.149717 , -2.094278),
      'Glasgow': new google.maps.LatLng(55.864237 , -4.251806),
      'Edinburgh': new google.maps.LatLng(55.953252 , -3.188267),
      'Liverpool': new google.maps.LatLng(53.408371 , -2.991573),
      'Manchester': new google.maps.LatLng(53.479324 , -2.248485)
      },
    heatmapData = [
      new google.maps.LatLng(53.479324 , -2.248485),
      new google.maps.LatLng(53.479324 , -2.248485)
    ];

var infowindow = new google.maps.InfoWindow({
    content: 'holding...'
  });


function initialize() {
  var mapOptions = {
    zoom: 6,
    minZoom: 6,
    maxZoom: 9,
    center: new google.maps.LatLng(53.820,-4.674683)};

  var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
  setListeners(map);
  setMarkers(map);
  createHeatmap(map);
  return map;
}

var map = initialize();


function setListeners(map) {
  google.maps.event.addListener(map, 'center_changed', function () {
    if (strictBounds.contains(map.getCenter()))
      {return;}
    var c = map.getCenter(),
       x = c.lng(),
       y = c.lat(),
       maxX = strictBounds.getNorthEast().lng(),
       maxY = strictBounds.getNorthEast().lat(),
       minX = strictBounds.getSouthWest().lng(),
       minY = strictBounds.getSouthWest().lat();

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;

    map.setCenter(new google.maps.LatLng(y, x));
  });
}

function setMarkers(map) {
  for (city in myCities) {
    var marker = new google.maps.Marker({
      position: myCities[city],
      map: map,
      title: city
    })
  google.maps.event.addListener(marker, 'click', function (){
    content = setInfWindowContent(this);
    infowindow.setContent(content)
    infowindow.open(map, this);
  })
  }
}

function setInfWindowContent(marker) {
  var contentString = '<div id="'+marker.title+'InfoWindow">' +
  '<h1 class="InfoWindowTitle">' + marker.title +'</h1>'+
  '<div class="bodyContent"> Fancy Analytics going on here and pretty pictures!\n' +
  '</div>'+
  '<img src="/grumpyCat.png" width=150></img></div>';
  return contentString;
}

function createHeatmap(map) {
  var heatMap = new google.maps.visualization.HeatmapLayer({
    // data: heatmapData
  });
  heatMap.setMap(map)
}



});