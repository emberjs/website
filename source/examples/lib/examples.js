Examples = SC.Application.create();
Examples.SelectPopupView = SC.View.extend({
  didInsertElement: function() {
    this.change();
  },

  change: function() {
    var input = this.$('select');
    var exampleToLoad = input.val();

    Examples.exampleController.set('example', exampleToLoad);
  }
});

Examples.exampleController = SC.Object.create({
  example: '',

  exampleDidChange: function() {
    var example = this.get('example');
    this.updateExample(example);
  }.observes('example'),

  updateExample: function(example) {
    var iframe;

    iframe = this.get('iframe');
    if (iframe) {
      document.body.removeChild(iframe);
    }

    iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    var iframeDocument = iframe.contentDocument,
        iframeBody = iframeDocument.body,
        iframeWindow = iframe.contentWindow;

    var libraries = ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js', 'lib/sproutcore.js'];
    var script;

    libraries.forEach(function(url) {
      script = this.createScriptElement(iframeDocument, url);
      iframeDocument.head.appendChild(script);
    }, this);


    script = this.createScriptElement(iframeDocument, "/examples/"+example+"/source.js");
    iframeBody.appendChild(script);

    $.ajax('/examples/'+example+'/template.handlebars', {
      success: function(template) {
        var view = iframeWindow.SC.View.create({
          template: iframeWindow.SC.Handlebars.compile(template)
        });
        view.append();
      }
    });

    this.set('iframe', iframe);
  },

  createScriptElement: function(document, url) {
    var elem = document.createElement('script');
    elem.src = url;
    return elem;
  }
});

