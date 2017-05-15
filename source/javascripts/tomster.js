$(function() {
  var filter = getUrlParameter('filter') || 'all';
  var visibleElements = [];
  var $this;

  // handle active link
  $('#tomster-filter a').removeClass('active');
  if (filter === 'all') {
    $('#tomster-filter a[href="/mascots"]').addClass('active');
  } else {
    $('#tomster-filter a[href$="' + filter + '"]').addClass('active');
  }

  // filter
  $('.tomster-wrapper').each(function() {
    $this = $(this);
    if($this.attr('data-tags').indexOf(filter) === -1) {
      $this.hide();
    }
  });
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
