# Sorting displayed data

## Problem
You have a collection of `Post` model object displayed in a template and you want to be able to sort ascending or descending on one or more keys.

Please see this [jsFiddle](http://jsfiddle.net/bazzel/wdr7j/) for a working example.

## Solution
Create (or if you already have one: update) a `PostsController` that contains an action that do the actual sorting. This action called is when you click on an element in the template.

For this element you create an Ember component that [implements a click event](http://emberjs.com/guides/components/handling-user-interaction-with-actions/) handler and [delegates the event to the controller](http://emberjs.com/guides/components/sending-actions-from-components-to-your-application/). The main reason for creating a component for the sort element is that you want to update the state of the element with an appropriate icon (or color or whatever) indicating which key is used for sorting and if sorting happened in an ascending or descending order.

By passing the controller's `sortProperties` and `sortAscending` properties we're able to remember the state and update and look of the element accordingly.

The sorting is done by the controller. The passed property indicated the key the content needs to be sorted on. If the content is already sorted on this property and assume we want to sort in reverse order. Otherwise we sort ascending. Hence the `return false` (since CoffeeScript always the last returned statement) to prevent errors when calling the sort action from a component (see later):

```javascript
App.PostsController = Ember.ArrayController.extend
  actions:
    sort: (property) ->
      if @get('isSorted') and (@get('sortProperties')[0] is property)
          @toggleProperty('sortAscending')
      else
        @set('sortProperties', [property])
        @set('sortAscending', yes)

      # Returning false prevents the action from bubbling
      return false
```

Instead of calling the `sort` action from an `{{action}}` helper, we create a component `sorting-key` and have this component delegate the event to the controller:

```javascript
App.SortingKeyComponent = Ember.Component.extend
  tagName: 'dd'
  classNameBindings: ['isSorted:active', 'isAsc:asc', 'isDesc:desc']
  isSorted: (->
    @get('sortProperties')?[0] is @get('key')
  ).property('sortProperties')
  isAsc: (->
    @get('isSorted') and @get('sortAscending')
  ).property('isSorted', 'sortAscending')
  isDesc: (->
    @get('isSorted') and not @get('sortAscending')
  ).property('isSorted', 'sortAscending')
  click: ->
    @sendAction 'action', @get('key')
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

```handlebars
<dd>
  <a>Title</a>
</dd>
```

When you click the Title key, `classNameBindings` adds the proper classnames:

```handlebars
<dd class='active asc'>
  <a>Title</a>
</dd>
```

By using CSS or Sass you can sorting arrows or other indicators to the elements:

```handlebars
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

## Discussion
