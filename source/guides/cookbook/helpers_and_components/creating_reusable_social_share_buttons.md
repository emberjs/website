### Problem
You want to create a reusable [Tweet button](https://dev.twitter.com/docs/tweet-button)
for your application.

### Solution
Write a custom component that renders the Tweet button with specific attributes
passed in.

```handlebars
{{share-twitter data-url="http://emberjs.com" 
                data-text="EmberJS Components are Amazing!" 
                data-size="large" 
                data-hashtags="emberjs"}}

```

```javascript
App.ShareTwitterComponent = Ember.Component.extend({
  tagName: 'a',
  classNames: 'twitter-share-button',
  attributeBindings: ['data-size', 'data-url', 'data-text', 'data-hashtags']
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
