$(function() {
  var backToTop = $('#back-to-top');
  var doc = $(document);
  var offset = backToTop.offset();
  var marginTop = 90;
  var showing = false;

  positionBackToTop = function(reset) {
    if (reset) {
      backToTop.css({
        top: '',
        position: ''
      });
      offset = backToTop.offset();
    }

    if (!showing && doc.scrollTop() > offset.top+200) {
      showing = true;
      backToTop.css({
        position: 'fixed',
        top: 20,
        left: offset.left,
        display:' block'
      });
    } else if (showing && doc.scrollTop() <= offset.top+200) {
      showing = false;
      backToTop.css({
        display:'none'
      });
    }
  };

  if (backToTop.length) {
    backToTop.on('click', function(evt) {
      $('html,body').animate({scrollTop: 0}, 200);
      return false;
    });

    doc.on('scroll', function() {
      positionBackToTop();
    });
  }

  $('.bx-wrapper, .bx-window').width(940);
});
