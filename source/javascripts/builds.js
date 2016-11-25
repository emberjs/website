$(function() {
  var bucketURL = "https://s3.amazonaws.com/apps.emberjs.com/releases/";
  var indexURL = "https://s3.amazonaws.com/apps.emberjs.com/releases/index.json";

  function setUpMeta(tagInfo) {
    var element;
    var i;

    for (i=0; i < tagInfo.length; i++) {
      element = document.createElement('meta');
      element.name = tagInfo[i].name;
      element.content = tagInfo[i].content;

      document.head.appendChild(element);
    }
  }
  function setUpLinks(tagInfo) {
    var element;
    var i;

    for (i=0; i < tagInfo.length; i++) {
      element = document.createElement('link');
      element.rel = tagInfo[i].rel;
      element.href = bucketURL + tagInfo[i].href;
      // element.integrity = tagInfo[i].integrity;

      document.head.appendChild(element);
    }
  }

  function setUpScripts(tagInfo) {
    var element;
    var i;

    for (i=0; i < tagInfo.length; i++) {
      element = document.createElement('script');
      element.src = bucketURL + tagInfo[i].src;
      // element.integrity = tagInfo[i].integrity;
      element.async = false;

      console.log(tagInfo[i].src);

      document.head.appendChild(element);
    }
  }

  function setUpTags(index) {
    setUpMeta(index.meta);
    // setUpLinks(index.link);
    setUpScripts(index.script);
  }

  $.getJSON(indexURL, setUpTags)
});
