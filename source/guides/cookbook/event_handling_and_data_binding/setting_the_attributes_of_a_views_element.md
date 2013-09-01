## Problem
You want to set the attributes of an HTML element that is created from an Ember.View or Ember.Component

## Solution
Use either the `{{bind-attr}}` Handlebars helper in your templates; or, set an attribute binding to a path in your application or to a property of the view (or component). The attribute bindings can be set on the element using the `attributeBindings` property of your view (or component).

## Discussion

There are two ways to bind attributes using either a view or component:

1) In your Handlebars template (for a view or component) use the helper `{{bind-attr}}`  

* `<a {{bind-attr href=href title=title}}>`  
  
2) Extend Ember.View or Ember.Component and use `attributeBindings`  

* List the objects properties that will be bound, e.g. `['src']`
* Define a property with the same name or alias the property, e.g.:
  * Add a `src` property to bind the `src` attribute
    * `attributeBindings: ['src']`
  * Add a `dataMeta` property and bind to the `data-meta` attribute
    * `attributeBindings: ['dataMeta:data-meta']`
* Alias another property using a path in the application
  * Define a property binding like `altBinding: 'title'`
  * Use the alt attribute with `attributeBindings: ['alt']`


*Example code:*

<a class="jsbin-embed" href="http://jsbin.com/oDaRIc/1/embed?html,js,output">Cookbook: Setting The Attributes of a Component's Element</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Example template code

```html
  <script type="text/x-handlebars" id="image">
    {{view App.ImageTitleView}}
    <a {{bind-attr href=href title=title}}>
      {{fpo-img width=width height=height domain=domain text=text title=title}}
    </a>
  </script>

  <script type="text/x-handlebars" id="components/fpo-img">
    {{yield}}
  </script>
```

### Example application code

```javascript
App.ImageRoute = Ember.Route.extend({
  model: function() {
    return {
      domain: 'http://fpoimg.com/',
      width: 300,
      height: 200,
      text: 'Cookbook Image',
      title: 'FPO Image',
      href: 'http://emberjs.com/guides/cookbook/event_handling_and_data_binding/setting_the_attributes_of_a_views_element'
    };
  }
});

App.FpoImgComponent = Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height', 'alt'],
  src: function () {
    // E.g. http://fpoimg.com/300x300?text=Advertisement
    return [
      this.get('domain'),
      this.get('width'), 'x', this.get('height'),
      '?text=', this.get('text'),
    ].join('');
  }.property('domain', 'width', 'height', 'text'),
  altBinding: 'title'
});

App.ImageTitleView = Ember.View.extend({
  tagName: 'h2',
  attributeBindings: ['style', 'dataMeta:data-meta'],
  style: 'color: red;',
  dataMeta: 'Image not final',
  template: Ember.Handlebars.compile('{{view.title}}'),
  title: 'Cookbook Image'
});
```

### Links

* <http://emberjs.com/guides/templates/binding-element-attributes/>
* <http://emberjs.com/api/classes/Ember.View.html#property_attributeBindings>
* <http://emberjs.com/api/classes/Ember.Component.html#property_attributeBindings>
* <http://jsbin.com/oDaRIc/1/>
