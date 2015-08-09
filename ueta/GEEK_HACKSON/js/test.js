var address01 = $(".js-address").text();
var mapDiv01 = document.getElementById('map_canvas');

function initialize() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address01
  }, function(result, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latlng = result[0].geometry.location;
      var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
       };
      var map = new google.maps.Map(mapDiv01, myOptions);
      var marker = new google.maps.Marker({
        position: latlng,
        map: map
      });
    } else {
      alert('取得できませんでした…');
    }
  });
}
// Map lodding
google.maps.event.addDomListener(window, 'load', initialize);