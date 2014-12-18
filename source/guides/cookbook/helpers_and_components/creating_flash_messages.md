### Problem
You want rails style flash messages to appear in your application when things happen.

### Solution
Use a simple array controller, view and template.

```handlebars
<script type='text/x-handlebars' id='application'>
{{#each flashMessage in flashMessages}}
{{view "flash" contentBinding="flashMessage"}}
{{/each}}
</script>

<script type='text/x-handlebars' id='flash'>
{{#if flashMessage.isNotice}}
<div class="alert alert-info alert-dismissible no-left-margin no-right-margin small-margin-bottom small-padding" role="alert">
	<button type="button" class="close" style="right: 0px;" data-dismiss="alert" {{action "click" flashMessage target=view}}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	{{flashMessage.message}}
</div>
{{/if}}
{{#if flashMessage.isSuccess}}
<div class="alert alert-success alert-dismissible no-left-margin no-right-margin small-margin-bottom small-padding" role="alert">
	<button type="button" class="close" style="right: 0px;" data-dismiss="alert" {{action "click" flashMessage target=view}}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	{{flashMessage.message}}
</div>
{{/if}}
{{#if flashMessage.isError}}
<div class="alert alert-danger alert-dismissible no-left-margin no-right-margin small-margin-bottom small-padding" role="alert">
	<button type="button" class="close" style="right: 0px;" data-dismiss="alert" {{action "click" flashMessage target=view}}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	{{flashMessage.message}}
</div>
{{/if}}
</script>
```

```javascript
App.FlashController = Ember.ArrayController.extend({
});
App.ApplicationController = Ember.Controller.extend({
    needs: ['flash']
});

App.FlashView = Ember.View.extend({
    templateName: 'flash',
    didInsertElement: function() {
        console.log("flash inserted");
        var me = this;
        this.$().fadeIn(700);
    },
    actions: {
        click: function(alert) {
            this.get('controller').get('controllers.flash').removeObject(this.get('content'));
            this.destroy();
        }
    }
});

App.FlashMessage = DS.Model.extend({
    type: DS.attr('string'),
    message: DS.attr('string'),
    isNotice: function() {
        return this.get("type") === "notice";
    }.property("type"),
    isSuccess: function() {
        return this.get("type") === "success";
    }.property("type"),
    isError: function() {
        return this.get("type") === "error";
    }.property("type")
});
```

Include Twitter's widget code in your HTML:

```javascript
<script type="text/javascript" src="http://platform.twitter.com/widgets.js" id="twitter-wjs"></script>
```

### Discussion
Twitter's widget library expects to find an `<a>` tag on the page with specific `data-` attributes applied.
It takes the values of these attributes and, when the `<a>` tag is clicked, opens an iFrame for twitter sharing.

The `share-twitter` component takes four options that match the four attributes for the resulting `<a>` tag:
`data-url`, `data-text`, `data-size`, `data-hashtags`. These options and their values become properties on the
component object. 

The component defines certain attributes of its HTML representation as bound to properties of the object through
its `attributeBindings` property. When the values of these properties change, the component's HTML element's
attributes will be updated to match the new values.

An appropriate tag and css class are applied through the `tagName` and `classNames` properties.

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OpocEPu/1/edit?js,output">JS Bin</a>
