(function() {
  var handler = Gmaps.build('Google'),
      mapOptions = $('meta[name=mapOptions]').attr('content');
      locations = $('meta[name=locations]').attr('content');

  mapOptions = JSON.parse(mapOptions);
  locations = JSON.parse(locations);
  mapOptions.provider.zoomControlOptions = google.maps.ZoomControlStyle.SMALL;

  var markerLocations = [];

  var generateMarkerData = function(element) {

    var groups = element.groups;

    groups.forEach( function(element){

      var markerIcon = {
          "url": '/images/meetups/map-pin.png',
          "width": 20,
          "height": 28
      };

      var orgMarkup = "";
      if(element.organizers){
        element.organizers.forEach( function(el){
          if( typeof el.profileImage == 'undefined'){
            el.profileImage = "http://photos3.meetupstatic.com/photos/member/d/c/7/0/highres_179096432.jpeg";
          }
          orgMarkup += "<div class='organizer'><img src='"+el.profileImage+"' class='profile'><strong>"+el.organizer+"</strong><br>Organizer</div>";
        });
      }

      element.infowindow = "<div class='map-marker'><h2>"+element.location+"</h2>"+orgMarkup+"<div class='view'><a href='"+element.url+"' target='_blank'>Go to meetup page</a></div></div>";
      element.picture = markerIcon;

      if(element.lat && element.lng){
        markerLocations.push(element);
      }

    });
  };

  locations.forEach( generateMarkerData );

  handler.buildMap(mapOptions, function() {
    if(navigator.geolocation) {
      var geoLocation = navigator.geolocation.getCurrentPosition(drawMap);
    } else {
      drawMap();
    }
  } );

  function bindLiToMarker(json_array) {
    _.each(json_array, function(json){

        var markerId = json.location.toLowerCase().replace(/\W/g, '');

        $('#'+markerId).on('click', function(e){
          e.preventDefault();
          handler.getMap().setZoom(14);
          json.marker.setMap(handler.getMap()); //because clusterer removes map property from marker
          json.marker.panTo();
          google.maps.event.trigger(json.marker.getServiceObject(), 'click');
          $("html, body").animate({
            scrollTop:0
          },"slow");
        });

      });

  }

  function drawMap(position){

    var markers = handler.addMarkers(markerLocations);

    _.each(markerLocations, function(json, index){
      json.marker = markers[index];
    });

    bindLiToMarker(markerLocations);

    handler.bounds.extendWith(markers);
    if (position) {
      var marker = handler.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      handler.map.centerOn(marker);
      handler.bounds.extendWith(marker);
    }
    handler.fitMapToBounds();
  }
})();
