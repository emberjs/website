## Specifying a Route's Model

Templates in your application are backed by models. Based on the routes
you've defined, the user will see different templates based on what URL
they visit. But how do templates know which model they should display?

For example, if you have a `photos` template, how does it know which
model to render?

This is what `Ember.Route` is for. You can tell a template which model
it should render by defining a route with the same name as the template,
and implement its `model` hook.

For example, to provide some model data to the `photos` template, we
would define an `App.PhotosRoute` object:

```js
App.PhotosRoute = Ember.Route.extend({
  model: function() {
    return [{
      title: "Tomster",
      url: "http://emberjs.com/images/about/ember-productivity-sm.png"
    }, {
      title: "Eiffel Tower",
      url: "http://emberjs.com/images/about/ember-structure-sm.png"
    }];
  }
});
```

<a class="jsbin-embed" href="http://jsbin.com/oLUTEd/1/embed?js">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Asynchronously Loading Models

In the above example, the model data was returned synchronously from the
`model` hook. This means that the data was available immediately and
your application did not need to wait for it to load, in this case
because we immediately returned an array of hardcoded data.

Of course, this is not always realistic. Usually, the data will not be
available synchronously, but instead must be loaded asynchronously over
the network. For example, we may want to retrieve the list of photos
from a JSON API available on our server.

The good news is that you can return a promise from the `model` hook,
and Ember will wait until that promise is resolved before rendering the
template.

If you're unfamiliar with promises, the basic idea is that they are
objects that represent eventual values. For example, if you use jQuery's
`getJSON()` method, it will return a promise for the JSON that is
eventually returned over the network. Ember uses this promise object to
know when it has enough data to continue rendering.

For more about promises, see [A Word on
Promises](/guides/routing/asynchronous-routing/#toc_a-word-on-promises)
in the Asynchronous Routing guide.

Let's look at an example in action. Here's a route that loads the most
recent pull requests sent to Ember.js on GitHub:

```js
App.PullRequestsRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('https://api.github.com/repos/emberjs/ember.js/pulls');
  }
});
```

While this example looks like it's synchronous, making it easy to read
and reason about, it's actually completely asynchronous. That's because
jQuery's `getJSON()` method returns a promise. Ember will detect the
fact that you've returned a promise from the `model` hook, and wait
until that promise resolves to render the `pullRequest` template.

(For more information on jQuery's XHR functionality, see
[jQuery.ajax](http://api.jquery.com/jQuery.ajax/) in the jQuery
documentation.)

Because Ember supports promises, it can work with any persistence
library that uses them as part of its public API. You can also use many
of the conveniences built in to promises to make your code even nicer.

For example, imagine if we wanted to modify the above example so that
the template only displayed the three most recent pull requests. We can
rely on promise chaining to modify the data returned from the JSON
request before it gets passed to the template:

```js
App.PullRequestsRoute = Ember.Route.extend({
  model: function() {
    var url = 'https://api.github.com/repos/emberjs/ember.js/pulls';
    return Ember.$.getJSON(url).then(function(data) {
      return data.splice(0, 3);
    });
  }
});
```

So what actually happens with the value you return from the `model`
hook?

By default, the value returned from your `model` hook will be assigned
to the `model` property of the related controller. For example, if your
`App.PostsRoute` returns an object from its `model` hook, that object
will be set as the `model` property of the `App.PostsController`.

(This, under the hood, is how template's know which model to render: they
look at their controller's `model` property.)

You can change this behavior by implementing the [`setupControllers`
hook][1]. Note that if you override `setupControllers` and do not set
the `model` property on a controller, your template will not have any
data to render!

[1]: /guides/routing/setting-up-a-controller

### Dynamic Models

If a route has a dynamic segment, you will want to use the parameters to
decide which model to use. When the user visits your application with a
URL that contains a dynamic segment, Ember will extract it from the URL
for you and pass it to the `model` hook as the first argument:

```js
App.Router.map(function() {
  this.resource('post', { path: '/posts/:post_id' });
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON('/posts/'+params.post_id);
  }
});
```

Note: A route with a dynamic segment will only have its `model` hook called
when it is entered via the URL. If the route is entered through a transition
(e.g. when using the [link-to][2] Handlebars helper), then a model context is
already provided and the hook is not executed. Routes without dynamic segments
will always execute the model hook.

[2]: /guides/templates/links
