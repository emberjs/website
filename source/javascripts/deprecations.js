//= require ./toc.js

(function() {
  var tocEl = $("#toc-list"),
      lastOl;

  $('h3, h4').each(function() {
    var $this = $(this);

    if ($this.prop('tagName') === 'H3') {
      var li = $("<li class='level-1'>" +
                    "<a class='slide-widget-head' href='#" + $this.attr('id') + "'>" + $this.text() + "</a>" +
                    "<ol></ol>" +
                  "</li>");

      lastOl = li.find('ol');

      li.appendTo(tocEl);
    } else {
      lastOl.append("<li class='level-3'>" +
                      "<a href='#" + $this.attr('id') + "'>" + $this.text() + "</a>" +
                    "</li>");
    }
  });
})();
