# Sorting displayed data

## Problem
You have a collection of `Post` model objects displayed in a template and you want to be able to sort ascending or descending on one or more keys.

Please see this [jsFiddle](http://jsfiddle.net/bazzel/wdr7j/) for a working example.

## Solution
Create (or if you already have one: update) a `PostsController` that contains an action that do the actual sorting. This action called is when you click on an element in the template.

For this element you create an Ember component that [implements a click event](http://emberjs.com/guides/components/handling-user-interaction-with-actions/) handler and [delegates the event to the controller](http://emberjs.com/guides/components/sending-actions-from-components-to-your-application/). The main reason for creating a component for the sort element is that you want to update the state of the element with an appropriate icon (or color or whatever) indicating which key is used for sorting and if sorting happened in an ascending or descending order.

By passing the controller's `sortProperties` and `sortAscending` properties we're able to remember the state and update the look of the element accordingly.

The sorting is done by the controller. The passed property indicated the key the content needs to be sorted on. If the content is already sorted on this property and assume we want to sort in reverse order. Otherwise we sort ascending. Hence the `return false` to prevent errors when calling the sort action from a component (see later):

```javascript
App.PostsController = Ember.ArrayController.extend({
  actions: {
    sort: function(property) {
      if (this.get('isSorted') && (this.get('sortProperties')[0] === property)) {
        this.toggleProperty('sortAscending');
      } else {
        this.set('sortProperties', [property]);
        this.set('sortAscending', true);
      }
    }
  }
});
```

Instead of calling the `sort` action from an `{{action}}` helper, we create a component `sorting-key` and have this component delegate the event to the controller:

```javascript
App.SortingKeyComponent = Ember.Component.extend({
  tagName: 'dd',
  classNameBindings: ['isSorted:active', 'isAsc:asc', 'isDesc:desc'],
  isSorted: (function() {
    if this.get('sortProperties') {
      return this.get('sortProperties')[0] === this.get('key');
    } else {
      return false;
    }
  }).property('sortProperties'),
  isAsc: (function() {
    return this.get('isSorted') && this.get('sortAscending');
  }).property('isSorted', 'sortAscending'),
  isDesc: (function() {
    return this.get('isSorted') && !this.get('sortAscending');
  }).property('isSorted', 'sortAscending'),
  click: function() {
    this.sendAction('action', this.get('key'));
  }
});
```

The corresponding template:

```handlebars
<script type="text/x-handlebars" id="components/sorting-key">
  <a {{action 'sort' 'title'}}>{{title}}</a>
</script>
```

The component uses `sortProperties` and `sortAscending` to store the current sort key and order. The values are passed as arguments by the component element and represent the `sortProperties` and `sortAscending` properties from the controller. These arguments are linked to the controller; when, for example, the `sortAscending` property on the controller toggles from `true` to `false`, the `sortAscending` property for each instance of a component updates to `false`.

If you find the property names used by the component confusing, feel free to use other names.

The component uses these properties in turn to update other properties such as `isSorted` (is the content sorted by the key used by a component), `isAsc` and `isDesc` (when the content is sorted by the component's key is it then sorted ascending or descending). These properties are used to update the classNames of the component via the `classNameBindings`.

The value used for `tagName` can vary, here we use `dd`, since we wrap the component elements in a definition list (`<dl>`) element.

To add a sort section to our posts template we can use the following code:

```handlebars
<dl class="sub-nav">
  <dt>Sort:</dt>
  {{sorting-key title='Id'
                key='id'
                sortProperties=sortProperties
                sortAscending=sortAscending
                action='sort'}}
  {{sorting-key title='Title'
                key='title'
                sortProperties=sortProperties
                sortAscending=sortAscending
                action='sort'}}
  {{sorting-key title='Published'
                key='published'
                sortProperties=sortProperties
                sortAscending=sortAscending
                action='sort'}}
</dl>
```

The generated markup (ignoring the ember `script` tags, `id` and `class` attributes) for the Title element looks like the following:

```html
<dd>
  <a>Title</a>
</dd>
```

When you click the `Title` key, `classNameBindings` adds the proper classnames:

```html
<dd class='active asc'>
  <a>Title</a>
</dd>
```

By using CSS or Sass you can sorting arrows or other indicators to the elements:

```css
.sub-nav dd {
  a:after {
    content: " \25B4\25BE";
  }

  &.asc a:after {
    content: " \25B4";
  }

  &.desc a:after {
    content: " \25BE";
  }
}
```

### Using ES6 modules
The previous code samples use a global namespace variable `App`. However, ES6 module syntax is [right on the corner](http://emberjs.com/blog/2013/12/17/whats-coming-in-ember-in-2014.html) and really easy with [Ember CLI](http://iamstef.net/ember-cli) available. Converting the code sample is dead simple:

```javascript
// app/controllers/posts.js
var PostsController = Ember.ArrayController.extend({
  actions: {
    sort: function(property) {
      if (this.get('isSorted') && (this.get('sortProperties')[0] === property)) {
        this.toggleProperty('sortAscending');
      } else {
        this.set('sortProperties', [property]);
        this.set('sortAscending', true);
      }
    }
  }
});

export default PostsController;
```

```javascript
// app/components/sorting-key.js
var SortingKeyComponent = Ember.Component.extend({
  tagName: 'dd',
  classNameBindings: ['isSorted:active', 'isAsc:asc', 'isDesc:desc'],
  isSorted: (function() {
    if this.get('sortProperties') {
      return this.get('sortProperties')[0] === this.get('key');
    } else {
      return false;
    }
  }).property('sortProperties'),
  isAsc: (function() {
    return this.get('isSorted') && this.get('sortAscending');
  }).property('isSorted', 'sortAscending'),
  isDesc: (function() {
    return this.get('isSorted') && !this.get('sortAscending');
  }).property('isSorted', 'sortAscending'),
  click: function() {
    this.sendAction('action', this.get('key'));
  }
});

export default SortingKeyComponent;
```

## Discussion
