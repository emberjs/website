$(function() {
  var ls = window['localStorage'];

  // Restoring method visibility preference from localStorage
  function initApiOptions() {
    var type = this.getAttribute('data-type');
    var checked = ls ? ls.getItem('internal-api-options-' + type) : undefined;

    if (checked != undefined) {
      // Bools are stored as strings in localStorage
      checked = checked == 'true';
      $(this).attr('checked', checked);
    }
  };

  // Type toggling
  function toggleType() {
    var type = this.getAttribute('data-type');

    $('.'+type).toggle(this.checked);
    $('#api-options input[data-type='+type+']').prop('checked', this.checked);

    if(ls) {
      ls.setItem('internal-api-options-' + type, this.checked);
    }
  }

  function confirmPaneInputs() {
    $(this).closest('#api-options').find('input').each(toggleType);
  }

  $('#api-options input').each(initApiOptions);
  $('#api-options input').each(toggleType);
  $('#api-options input').on('change', confirmPaneInputs);

  // Tabs
  $('.tabs .pane').hide();
  $('.tabs .pane:first').show();
  $('.tabs ul li:first').addClass('active');

  function showPane($tabs, href) {
    var $ul = $tabs.find('> ul');
    var $tab = $ul.find('a[href='+href+']');
    var $pane = $(href);

    $ul.find('li').removeClass('active');
    $tab.parent().addClass('active');
    $tabs.find('.pane').hide();

    $pane.show();
  }

  $('.tabs > ul li a').click(function(){
    var $el = $(this);
    var $tabs = $el.parents('.tabs');
    var href = $el.attr('href');

    showPane($tabs, href);

    return false;
  });

  // Auto tab
  function checkHash() {
    var hash = window.location.hash;
    var $el = $(hash);

    if ($el.length > 0 && !$el.is(':visible')) {
      showPane($el.parents('.tabs'), '#'+$el.parents('.pane').attr('id'));
      $("html, body").scrollTop($el.offset().top);
    } else if ($el.length == 0) {
      showPane($('.tabs'), '#index');
    }
  }

  $(window).on('hashchange', checkHash);
  checkHash();
});
