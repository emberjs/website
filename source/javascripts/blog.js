//= require ./toc.js

(function() {
  var tocEl = document.querySelector("#toc-content"),
      lastOl;

  document.querySelectorAll('h3, h4').forEach(function(el, index, list) {
    var listEl = document.createElement('li');

    if (el.tagName === 'H3') {

      listEl.setAttribute('class', 'level-1');
      listEl.innerHTML = "<a href='#" + el.getAttribute('id') + "'>" + 
        el.textContent + "</a>" +
        "<ol></ol>";
      lastOl = listEl.querySelector('ol');
      tocEl.appendChild(listEl);

    } else {
      listEl.setAttribute('class', 'level-3');
      listEl.innerHTML = "<a href='#" + el.getAttribute('id') + "'>" + el.textContent + "</a>";
      lastOl.appendChild(listEl);
    }
  });
})();
