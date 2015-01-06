(function() {
  var handler = Gmaps.build('Google');
  var styles = [
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "poi",
      stylers: [
       { visibility: "off" }
      ]
    },{
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        { visibility: "off" }
      ]
    },{
      "featureType": "transit",
      "stylers": [
        { visibility: "off" }
      ]
    }
  ];
  handler.buildMap({
    provider: {
      styles: styles,
      streetViewControl: false,
      panControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
    },
    internal: {id: 'map'}}, function(){
    var markers = handler.addMarkers([
      { 
        "lat": 33.7677129,
        "lng": -84.420604,
        "picture": {
          "url": "/images/meetups/map-pin.png",
          "width": 20,
          "height": 28
        },
        "infowindow": "<div class='map-marker'><h2>Atlanta, GA</h2><div class='organizer'><img src='http://photos3.meetupstatic.com/photos/member/d/c/7/0/highres_179096432.jpeg' class='profile'><strong>William Metz</strong><br>Organizer</div><div class='organizer'><img src='http://photos2.meetupstatic.com/photos/member/a/5/3/4/member_238302292.jpeg' class='profile'><strong>Chris McCuller</strong><br>Organizer</div><div class='organizer'><img src='http://photos4.meetupstatic.com/photos/member/b/d/4/e/member_214428462.jpeg' class='profile'><strong>Shane Ballman</strong><br>Organizer</div><div class='view'><a href='#' target='_blank'>Go to meetup page</a></div></div>"
      },
    ]);
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
  });
})();
