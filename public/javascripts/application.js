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


  function mCustomScrollbars(){
    $("#mcs3_container").mCustomScrollbar("vertical",900,"easeOutCirc",1.05,"auto","yes","no",0); 
  } mCustomScrollbars();

/* function to fix the -10000 pixel limit of jquery.animate */
 $.fx.prototype.cur = function(){
    if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
    return this.elem[ this.prop ];
   }
    var r = parseFloat( jQuery.css( this.elem, this.prop ) );
  return typeof r == 'undefined' ? 0 : r;
   }
  
			var geocoder;
			var map;
			var marker;
			
      function initialize(location) {
        var canvas = new google.maps.LatLng(location.lat, location.lon)
        geocoder = new google.maps.Geocoder();
        var myOptions = {
          center: canvas,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        for (var i = 0; i < 5; i++){
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat+(0.0015*i), location.lon+(0.00012*i)),
            map: map,
            title: 'My Location'
          });

          google.maps.event.addListener(marker, 'click', (function(marker,i){
            $('#focusedName').html(marker.title);
          })(marker, i));
        }

      }
			  
			function updateMap()
			{
        console.log($('#loc_search').val());
				codeAddress($('#loc_search').val());
			}
		  
			function codeAddress(passedAddress) 
			{ 
				//alert ("CODE ADDRESS FOR: " + passedAddress);
				geocoder.geocode( { 'address': passedAddress}, function(results, status) { 
					//alert(status);
					if (status == google.maps.GeocoderStatus.OK) 
					{
						//alert(results[0].geometry.location);
						map.setCenter(results[0].geometry.location);
						marker = new google.maps.Marker({
						 map: map,
						 position: results[0].geometry.location,
						 //title:"Hello World!"
						});
					}
					else if (status == google.maps.GeocoderStatus.ERROR){
						alert("Geocode was not successful for the following reason: ERROR");}
					else if (status == google.maps.GeocoderStatus.INVALID_REQUEST){
						alert("Geocode was not successful for the following reason:  INVALID_REQUEST");}
					else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
						alert("Geocode was not successful for the following reason:  OVER_QUERY_LIMIT");}
					else if (status == google.maps.GeocoderStatus.REQUEST_DENIED){
						alert("Geocode was not successful for the following reason:  REQUEST_DENIED");}
					else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR){
						alert("Geocode was not successful for the following reason:  UNKNOWN_ERROR");}
					else if (status == google.maps.GeocoderStatus.ZERO_RESULTS){
						alert("Geocode was not successful for the following reason:  ZERO_RESULTS");}
					else
						alert("This error should be impossible... Congratulations. You win.");
						
					google.maps.event.addListener(marker, 'click', function() {
            $("#focusedName").html($('#loc_search').val());
					// MARKER CLICKED EVENT
					// Insert code here to manipulate bottom pane contents to display details of selected marker. 
					// Also "highlight" item from the left pane list of marker results
					});
				});
			}
		  
		  function derp()
		  {
				$('form').submit(function(){
          updateMap();
          return false;
			});
		  }derp();
		  
    //google.maps.event.addDomListener(window, 'load', initialize);

});

