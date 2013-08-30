## Problem

You want to have a [Tweet button](https://dev.twitter.com/docs/tweet-button) on your Handlebars template and have it use dynamic content (URL, message, hashtag).

## Solution

Write a custom component which renders the Tweet button with provided attributes.

```hbs
<script type="text/x-handlebars">
  {{share-twitter data-url="http://emberjs.com" 
                  data-text="EmberJS Components are Amazing!" 
                  data-size="large" 
                  data-hashtags="emberjs"}}
</script>

<!-- Necessary for components -->
<script type="text/x-handlebars" 
        id="components/share-twitter"></script>
```

```js
App.ShareTwitterComponent = Ember.Component.extend({
  tagName: 'a',
  classNames: 'twitter-share-button',

  // Allow these attributes to be bound the those defined in the template
  attributeBindings: [
    'data-size', 'data-url', 
    'data-text', 'data-hashtags'
  ],
  
  // Trigger the Twitter javascript to run after the element is rendered
  displayButton: function() {
    // Extracted from twitter share js
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
  }.on('didInsertElement')
});
```

## Discussion

This code example demonstrates a great use case for Ember Components. This is a direct extraction from Twitter's [Tweet Button](https://dev.twitter.com/docs/tweet-button) API and uses the attribute bindings and the `didInsertElement` event to build the button.

<a class="jsbin-embed" href="http://jsbin.com/OMOgUzo/1/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>