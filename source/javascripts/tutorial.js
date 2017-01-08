//= require common-old-ie
//= require common-modern
//= require common-all

$(function(){
  $('.anchorable-toc').each(function(){
    var toc = $(this),
    id = toc.attr('id'),
    href = "#" + id,
    anchor = '<a class="toc-anchor" href="'+href+'"></a>';

    toc.prepend(anchor);
  });
});
