(function() {
  var handler = Gmaps.build('Google', {
                  markers: {
                    clusterer: {
                      minimumClusterSize: 4,
                      enableRetinaIcons: true,
                      styles: [
                        {
                          textSize: 12,
                          textColor: '#FFF',
                          url: '/images/meetups/map-cluster-1.png',
                          height: 28,
                          width: 28
                        }, {
                          textSize: 15,
                          textColor: '#FFF',
                          url: '/images/meetups/map-cluster-2.png',
                          height: 36,
                          width: 36
                        }
                      ]
                    }
                  }
                }),
      mapOptions = $('meta[name=mapOptions]').attr('content'),
      locations = $('meta[name=locations]').attr('content');

  mapOptions = JSON.parse(mapOptions);
  locations = JSON.parse(locations);
  mapOptions.provider.zoomControlOptions = google.maps.ZoomControlStyle.SMALL;

  var markerLocations = [];
  var meetupList = $('.meetups.list a');

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
        _.each(element.organizers, function(el){
          if( typeof el.profileImage == 'undefined'){
            el.profileImage = "http://photos3.meetupstatic.com/photos/member/d/c/7/0/highres_179096432.jpeg";
          }
          orgMarkup += "<div class='organizer'><div class='profile-img-wrapper'><img src='"+el.profileImage+"' class='profile-img'></div><strong>"+el.organizer+"</strong><br>Organizer</div>";
        });
      }

      element.infowindow = "<div class='map-marker'><h2>"+element.location+"</h2>"+orgMarkup+"<div class='view'><a href='"+element.url+"' target='_blank'>Go to meetup page</a></div></div>";
      element.picture = markerIcon;

      if(element.lat && element.lng){
        markerLocations.push(element);
      }
    });
  };

  function defaultLocation(){
    var latlng = new google.maps.LatLng(3, -13);

    handler.buildMap(mapOptions, function() {
      handler.map.centerOn(latlng);
      handler.getMap().setZoom(2);
    });
  }

  function setZoomBasedOnLatitudePosition(latitudePosition){
    if(latitudePosition != 3){
      handler.getMap().setZoom(8);
    }else{
      handler.getMap().setZoom(2);
    }
  }

  function success(pos) {
    var crd = pos.coords;
    var latlng = new google.maps.LatLng(crd.latitude, crd.longitude);
    handler.map.centerOn(latlng);
    setZoomBasedOnLatitudePosition(handler.getMap().getCenter().k);

  }

  defaultLocation();
  navigator.geolocation.getCurrentPosition(success);

  locations.forEach(generateMarkerData);

  handler.buildMap(mapOptions, function() {
    drawMap();
  });

  function bindLiToMarker(json_array) {
    _.each(json_array, function(json){

      var markerId = json.location.toLowerCase().replace(/\W/g, '');
      var currentMarker = $('#'+markerId);

      currentMarker.on('click', function(e){
        meetupList.removeClass('active');
        $(this).addClass("active");
        e.preventDefault();
        handler.getMap().setZoom(14);
        json.marker.setMap(handler.getMap()); //because clusterer removes map property from marker
        json.marker.panTo();
        google.maps.event.trigger(json.marker.getServiceObject(), 'click');

        $("html, body").animate({
          scrollTop:0
        },"slow");
      });

      google.maps.event.addListener(json.marker.getServiceObject(), 'click', function(){
        meetupList.removeClass('active');
        currentMarker.addClass("active");
        handler.getMap().setZoom(14);
      });
    });
  }

  function drawMap() {
    var markers = handler.addMarkers(markerLocations);

    _.each(markerLocations, function(json, index){
      json.marker = markers[index];
    });

    bindLiToMarker(markerLocations);

    handler.bounds.extendWith(markers);

    setZoomBasedOnLatitudePosition(handler.getMap().getCenter().k);
  }

  function zoomToPosition(position) {
    var marker = handler.addMarker({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    handler.map.centerOn(marker);
    handler.bounds.extendWith(marker);
    handler.getMap().setZoom(8);
  }
})();
