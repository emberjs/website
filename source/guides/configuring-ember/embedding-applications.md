In most cases, your application's entire UI will be created by templates
that are managed by the router.

But what if you have an Ember.js app that you need to embed into an
existing page, or run alongside other JavaScript frameworks?

### Changing the Root Element

By default, your application will render the [application
template](/guides/templates/the-application-template) and attach it to
the document's `body` element.

You can tell the application to append the application template to a
different element by specifying its `rootElement` property:

```js
App = Ember.Application.create({
  rootElement: '#app'
});
```

This property can be specified as either an element or a
[jQuery-compatible selector
string](http://api.jquery.com/category/selectors/).

### Disabling URL Management

You can prevent Ember from making changes to the URL by [changing the
router's `location`](/guides/routing/specifying-the-location-api) to
`none`:

```js
App.Router = Ember.Router.extend({
  location: 'none'
});
```
