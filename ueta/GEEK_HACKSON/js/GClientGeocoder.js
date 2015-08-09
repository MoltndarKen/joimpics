var map;

function init() {

  var lat = 35.680933;
  var lng = 139.767058;
  var zoom = 13;

  map = new google.maps.Map2(document.getElementById("map"));
  map.setCenter(new google.maps.LatLng(lat,lng), zoom);
  map.addControl(new google.maps.ScaleControl());
  map.addControl(new google.maps.LargeMapControl());
  map.addControl(new google.maps.MapTypeControl());
  map.addControl(new google.maps.OverviewMapControl());

/*
  if (navigator.userAgent.indexOf("Gecko/") != -1) {
    document.getElementById("url").size = "80";
  }
*/
/*
  var am = new google.maps.AdsManager(map, 'ca-pub-7939613401472758', {
    maxAdsOnMap: 16, channel: 'circle-GAdsManager', minZoomLevel: 6
  } );
  am.enable();
*/
}

function mapMoveTo(place) {
  var geocoder = new GClientGeocoder();

  geocoder.getLatLng(place, function(point) {
    if (!point) {
      alert("隕九▽縺九ｊ縺ｾ縺帙ｓ��" + place);
    } else {
      map.clearOverlays();
      map.setCenter(point);
      var marker = new GMarker(point);
      map.addOverlay(marker);
      marker.openInfoWindowHtml(place + "<br />" + "(Lat, Lng) = (" + point.lat()  +"," + point.lng() + ")");
    }
  });
}

function mapMoveTo2(place) {
  var geocoder = new GClientGeocoder();

  geocoder.getLocations(place, function(obj) {
    var results = new Array();
    if (obj.Status.code == G_GEO_SUCCESS){
      for (var i in obj.Placemark){
        var marker = new GMarker(
          new GLatLng(
            obj.Placemark[i].Point.coordinates[1],
            obj.Placemark[i].Point.coordinates[0]
          )
        );
        map.addOverlay(marker);
        results.push(obj.Placemark[i].address);
      }
    } else {
      alert("隕九▽縺九ｊ縺ｾ縺帙ｓ��" + place);
    }

    var msg = '';
    for (var i in results) {
      msg += results[i] + "<br>";
    }
    alert(msg);
/*
      map.clearOverlays();
      map.setCenter(point);
      var marker = new GMarker(point);
      map.addOverlay(marker);
      marker.openInfoWindowHtml(place + "<br />" + "(Lat, Lng) = (" + point.lat()  +"," + point.lng() + ")");
*/
  });
}

function showURL() {
  var data = '?z=' + map.getZoom() + '&lat='  + map.getCenter().lat() + '&lng=' + map.getCenter().lng();
  var p;
  for (p in markers) {
    data += '&m=' + markers[p].toString();
  }
  for (p in circles) {
    for (var r in circles[p]) {
      data += '&c=' + circles[p][r].toString();
    }
  }
  document.getElementById("url").value = location.protocol + '//' + location.host + location.pathname + data;
}

function openURL() {
  if (document.getElementById("url").value.length > 0) {
    window.open(document.getElementById("url").value);
  }
}