
var address01 ="東京駅";
$(document).ready(function () {
    $("#Button1").click(function () {
      address01 = $(".js-address").val();
     $("#output").text(address01);
    })
});

var mapDiv01 = document.getElementById('map_canvas');

var zoom_level=15;
var marker_list = new google.maps.MVCArray();
var data = new Array();
data.push({lat:'35.681382', lng:'139.766084',language:'東京駅'});
data.push({lat:'35.688687', lng:'139.77323',language:'大手町駅'});
data.push({lat:'35.68255', lng:'139.76437299999998',language:'新日本橋'});
data.push({lat:'35.6815101', lng:'139.76888199999996',language:'新日本橋'});
console.log(data[2].country);


function initialize() {

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address01
  },function(result, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latlng = result[0].geometry.location;
        console.log(latlng);
        var myOptions = {
          zoom: 20,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapDiv01, myOptions);
        console.log(zoom_level);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });

        for (i = 0; i < data.length; i++) {
          marker_list.push(new google.maps.Marker({
            position: new google.maps.LatLng
              (data[i].lat, data[i].lng),   map: map,
              icon: new google.maps.MarkerImage('images/france.png'
              ,new google.maps.Size(31,31),
              new google.maps.Point(0,0))
          }));
        }
        google.maps.event.addListener(map,'bounds_changed',function(){
          var latlngBounds = map.getBounds();
          console.log(latlngBounds)
          var swLatlng = latlngBounds.getSouthWest();
          var swlat = swLatlng.lat();
          var swlng = swLatlng.lng();

          var neLatlng = latlngBounds.getNorthEast();
          var nelat = neLatlng.lat();
          var nelng = neLatlng.lng();
          // console.log(swlat);
          // console.log(swlng)

        });
        google.maps.event.addListener(map, 'zoom_changed', function() {
            console.log(map.getZoom());
            zoom_cathe=zoom_level;
            zoom_level=map.getZoom();
            // if(!(zoom_cathe==13 && zoom_level>13 && zoom_level !=13)) {
            //   marker_list[marker_list.length-1].setVisible(false);
            // }
            console.log("zoom_changed "+ zoom_level);

            if(zoom_level>=11){
              marker_list.forEach(function(marker, idx) {
                marker.setVisible(true);
              });
              if(zoom_level<=13){
                marker_list.forEach(function(marker, idx) {
                  marker.setVisible(false);
                });
                marker_list.push(new google.maps.Marker({
                    position: new google.maps.LatLng(data[0].lat, data[0].lng),
                    map: map,
                    icon: new google.maps.MarkerImage('images/france1.png'
                      ,new google.maps.Size(80,80),
                      new google.maps.Point(0,0))
                }));
                marker_list[marker_list.length-1].setVisible(true);
              }else{
              }
            }else{
              marker_list.forEach(function(marker, idx) {
                marker.setVisible(false);
              });
            }
        });
          } else {
            alert('取得できませんでした…');
          }
        });
}
google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function () {
        $("#Button1").click(function () {
          address01 = $(".js-address").val();
         $("#output").text(address01);
          initialize()
        })
    });

