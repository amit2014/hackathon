$(function($){
  var locationMarker = null;
  
  function get_geo_location(callback){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function(position){
          if (locationMarker){
            return;
          }

          locationMarker = {
            lat:position.coords.latitude,
            lon:position.coords.longitude,
            msg:"my position"
          };

          callback(locationMarker);
        }
      )
    }
  } get_geo_location(initialize);

  function initialize(location){
    var canvas = new google.maps.LatLng(location.lat, location.lon)
    var map_options = {
      zoom: 12,
      center: canvas,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), map_options);

    marker = new google.maps.Marker({
      position: canvas,
      map: map,
      title: 'My Location'
    });

  }
});
