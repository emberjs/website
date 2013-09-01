$(function() {
  $('#slider').bxSlider({
    displaySlideQty: 4,
    moveSlideQty: 4,
    auto: true,
    pager: true,
    speed: 700,
    pause: 5000
  });

  // Hack to force proper sizing
  $('.bx-wrapper, .bx-window').css('width', 940);
});
