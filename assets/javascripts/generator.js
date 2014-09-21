$(function (){
  var myCities = {
      'London': [51.47 , -0.119476],
      'Aberdeen': [57.1 , -2.27],
      'Glasgow': [55.8 , -4.34],
      'Edinburgh': [55.859 , -3.28],
      'Liverpool': [53.36 , -3],
      'Manchester': [53.5 , -2.2]
      };
  var heatmap;

  $('.searchBar').bind("enterKey", function(e){
    toggleHeatmap();
    getCoordinates();

  })

  $('.searchBar').keyup(function(e){
    if(e.keyCode == 13){
      $(this).trigger("enterKey")
    }
  })

  function getCoordinates(){
    // Pick Cities
    var hotIndex = chooseCities(),
      cities = [],
      hotCities = [],
      coordinates = [],
      index = 0;

    for (city in myCities) {
      cities.push(city)
    }
    while (index < 5) {
      if (hotIndex.indexOf(index) != -1) {
        hotCities.push(cities[index])
      }
      index ++
    }

    $.each(hotCities, function (index,city){
      coordinates.push(myCities[city])
    })
    console.log(hotCities)

    if (hotCities.indexOf('London') !== -1) {
      generateLondon(coordinates);
    } else {
     countCoordinates(coordinates);
   }
}

function countCoordinates(coord) {
  heatmapData = []
  while (heatmapData.length < 300) {
    var xCoord = coord[0][0],
        yCoord = coord[0][1];
    while(heatmapData.length< 100) {
      heatmapData.push(genCoordinates(xCoord, yCoord))
    }
    var xCoord = coord[1][0],
        yCoord = coord[1][1];
     while(heatmapData.length< 200) {
      heatmapData.push(genCoordinates(xCoord, yCoord))

    }
    var xCoord = coord[2][0],
        yCoord = coord[2][1];
     while(heatmapData.length< 300) {
      heatmapData.push(genCoordinates(xCoord, yCoord))
    }
  }
  convertToGoogleCoord(heatmapData);
}

function genCoordinates(x, y) {
  newX = (x + (Math.random()/9));
  newY = (y + (Math.random()/5));
  return [newX, newY];
}

function genposLondonCoords(x, y) {
  newX = (x + (Math.random()/5.7));
  newY = (y + (Math.random()/5));
  return [newX, newY];
}

function gennegLondonCoords(x, y) {
  newX = (x - (Math.random()/7));
  newY = (y - (Math.random()/4));
  return [newX, newY];
}
function gennegposLondonCoords(x, y) {
  newX = (x + (Math.random()/7));
  newY = (y - (Math.random()/5));
  return [newX, newY];
}
function genposnegLondonCoords(x, y) {
  newX = (x - (Math.random()/5.7));
  newY = (y + (Math.random()/5));
  return [newX, newY];
}



function generateLondon(coord) {
heatmapData = []
while(heatmapData.length < 700){
  var xCoord = coord[0][0],
      yCoord = coord[0][1];
  if (xCoord ==51.47) {
      console.log("FOUND LONDON as NO1")
      while(heatmapData.length< 500) {
        heatmapData.push(genposLondonCoords(xCoord,yCoord))
        heatmapData.push(genposnegLondonCoords(xCoord,yCoord))
        heatmapData.push(gennegposLondonCoords(xCoord,yCoord))
        heatmapData.push(gennegLondonCoords(xCoord,yCoord))
      }
      var xCoord = coord[1][0],
          yCoord = coord[1][1];
      while(heatmapData.length< 600) {
        heatmapData.push(genCoordinates(xCoord,yCoord))
      }
      var xCoord = coord[2][0],
          yCoord = coord[2][1];
      while(heatmapData.length< 700) {
        heatmapData.push(genCoordinates(xCoord,yCoord))
      }
  } else {
    while(heatmapData.length< 100) {
      heatmapData.push(genCoordinates(xCoord,yCoord))
    }
    var xCoord = coord[1][0],
        yCoord = coord[1][1];
    if (xCoord == 51.47) {
        console.log("FOUND LONDON as NO2")
        while(heatmapData.length< 600) {
        heatmapData.push(genposLondonCoords(xCoord,yCoord))
        heatmapData.push(genposnegLondonCoords(xCoord,yCoord))
        heatmapData.push(gennegposLondonCoords(xCoord,yCoord))
        heatmapData.push(gennegLondonCoords(xCoord,yCoord))
        }
        var xCoord = coord[2][0],
            yCoord = coord[2][1];
        while(heatmapData.length< 700) {
          heatmapData.push(genCoordinates(xCoord,yCoord))
        }
    } else {
      while(heatmapData.length< 300) {
        heatmapData.push(genCoordinates(xCoord,yCoord))
      }
      var xCoord = coord[2][0],
          yCoord = coord[2][1];

      console.log("FOUND LONDON as NO3")
      while(heatmapData.length< 700) {
        heatmapData.push(genposLondonCoords(xCoord,yCoord))
        heatmapData.push(genposnegLondonCoords(xCoord,yCoord))
        heatmapData.push(gennegposLondonCoords(xCoord,yCoord))
        heatmapData.push(gennegLondonCoords(xCoord,yCoord))
      }
    }
  }
  convertToGoogleCoord(heatmapData);
  }
}

function convertToGoogleCoord(data){
  var geoCoordinates = []
  for (var i = 0; i < data.length; i++){
    geoCoordinates.push(new google.maps.LatLng(data[i][0] , data[i][1]))
  }
  createHeatmap(geoCoordinates);
}

function createHeatmap(coordinates) {
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: coordinates
    });
    heatmap.setMap(map)
}

function toggleHeatmap () {
  if (heatmap){
    heatmap.setMap(heatmap.getMap() ? null : map);
  }
}

function chooseCities(){
  var arr = [],
      n;
  for(var i =0; i<3; i++){
    do
      n=Math.floor(Math.random()*5); 
      while(arr.indexOf(n)!== -1)
      arr[i] = n;
  }

  return arr
  }
})
