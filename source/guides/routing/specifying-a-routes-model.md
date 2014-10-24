Templates in your application are backed by models. But how do templates
know which model they should display?

For example, if you have a `photos` template, how does it know which
model to render?

This is one of the jobs of an `Ember.Route`. You can tell a template
which model it should render by defining a route with the same name as
the template, and implementing its `model` hook.

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

<a class="jsbin-embed" href="http://jsbin.com/lihenu/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Asynchronously Loading Models

In the above example, the model data was returned synchronously from the
`model` hook. This means that the data was available immediately and
your application did not need to wait for it to load, in this case
because we immediately returned an array of hardcoded data.

Of course, this is not always realistic. Usually, the data will not be
available synchronously, but instead must be loaded asynchronously over
the network. For example, we may want to retrieve the list of photos
from a JSON API available on our server.

In cases where data is available asynchronously, you can just return a
promise from the `model` hook, and Ember will wait until that promise is
resolved before rendering the template.

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
until that promise resolves to render the `pullRequests` template.

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

### Setting Up Controllers with the Model

So what actually happens with the value you return from the `model`
hook?

By default, the value returned from your `model` hook will be assigned
to the `model` property of the associated controller. For example, if your
`App.PostsRoute` returns an object from its `model` hook, that object
will be set as the `model` property of the `App.PostsController`.

(This, under the hood, is how templates know which model to render: they
look at their associated controller's `model` property. For example, the
`photos` template will render whatever the `App.PhotosController`'s
`model` property is set to.)

See the [Setting Up a Controller guide][1] to learn how to change this
default behavior. Note that if you override the default behavior and do
not set the `model` property on a controller, your template will not
have any data to render!

[1]: /guides/routing/setting-up-a-controller

### Dynamic Models

Some routes always display the same model. For example, the `/photos`
route will always display the same list of photos available in the
application. If your user leaves this route and comes back later, the
model does not change.

However, you will often have a route whose model will change depending
on user interaction. For example, imagine a photo viewer app. The
`/photos` route will render the `photos` template with the list of
photos as the model, which never changes. But when the user clicks on a
particular photo, we want to display that model with the `photo`
template. If the user goes back and clicks on a different photo, we want
to display the `photo` template again, this time with a different model.

In cases like this, it's important that we include some information in
the URL about not only which template to display, but also which model.

In Ember, this is accomplished by defining routes with _dynamic segments_.

A dynamic segment is a part of the URL that is filled in by the current
model's ID. Dynamic segments always start with a colon (`:`). Our photo
example might have its `photo` route defined like this:

```js
App.Router.map(function() {
  this.resource('photo', { path: '/photos/:photo_id' });
});
```

In this example, the `photo` route has a dynamic segment `:photo_id`.
When the user goes to the `photo` route to display a particular photo
model (usually via the `{{link-to}}` helper), that model's ID will be
placed into the URL automatically.

See [Links](/guides/templates/links) for more information about linking
to a route with a model using the `{{link-to}}` helper.

For example, if you transitioned to the `photo` route with a model whose
`id` property was `47`, the URL in the user's browser would be updated
to:

```
/photos/47
```

What happens if the user visits your application directly with a URL
that contains a dynamic segment? For example, they might reload the
page, or send the link to a friend, who clicks on it. At that point,
because we are starting the application up from scratch, the actual
JavaScript model object to display has been lost; all we have is the ID
from the URL.

Luckily, Ember will extract any dynamic segments from the URL for
you and pass them as a hash to the `model` hook as the first argument:

```js
App.Router.map(function() {
  this.resource('photo', { path: '/photos/:photo_id' });
});

App.PhotoRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON('/photos/'+params.photo_id);
  }
});
```

In the `model` hook for routes with dynamic segments, it's your job to
turn the ID (something like `47` or `post-slug`) into a model that can
be rendered by the route's template. In the above example, we use the
photo's ID (`params.photo_id`) to construct a URL for the JSON
representation of that photo. Once we have the URL, we use jQuery to
return a promise for the JSON model data.

Note: A route with a dynamic segment will only have its `model` hook called
when it is entered via the URL. If the route is entered through a transition
(e.g. when using the [link-to][2] Handlebars helper), then a model context is
already provided and the hook is not executed. Routes without dynamic segments
will always execute the model hook.

[2]: /guides/templates/links


### Refreshing your model

If your data represented by your model is being updated frequently, you may
want to refresh it periodically:

<a class="jsbin-embed" href="http://jsbin.com/sefuv/2/embed?js">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

The controller can send an action to the Route; in this example above, the
IndexController exposes an action `getLatest` which sends the route an
action called `invalidateModel`. Calling the route's `refresh` method will force
Ember to execute the model hook again.


### Ember Data

Many Ember developers use a model library to make finding and saving
records easier than manually managing Ajax calls. In particular, using a
model library allows you to cache records that have been loaded,
significantly improving the performance of your application.

One popular model library built for Ember is Ember Data. To learn more
about using Ember Data to manage your models, see the
[Models](/guides/models) guide.
