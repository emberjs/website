# Ember Application Structure

On a high-level, you structure an Ember application by designing a series of nested routes that correspond to nested application state. This guide will first cover the high-level concepts, and then walk you through an example.

## Routing

A user navigates through your application by making choices about what
to view. For example, if you had a blog, your user might first choose
between your Posts and your About page. In general, you want to have a
default for this first choice (in this case, probably Posts).

Once the user has made their first choice, they're usually not done. In
the context of Posts, the user will eventually view an individual post
and its comments. Inside of an individual post, they can choose between
viewing a list of comments and a list of trackbacks.

Importantly, in all of these cases, the user is choosing what to display
on the page. As you descend deeper into your application state, those
choices affect smaller areas of the page.

In the next section, we'll cover how you control these areas of the
page. For now, let's look at how to structure your templates.

When the user first enters the application, the application is on the
screen, and it has an empty outlet that the router will control. In
Ember, an `outlet` is an area of a template that has its child template
determined at runtime based on user interaction.

<figure>
  <img src="/images/outlet-guide/application-choice.png">
</figure>

The template for the Application (`application.handlebars`) will look
something like this:

```handlebars
<h1>My Application</h1>

{{outlet}}
```

By default, the router will initially enter the _list of posts_ state,
and fill in the outlet with `posts.handlebars`. We will see later how
this works exactly.

<figure>
  <img src="/images/outlet-guide/list-of-posts.png">
</figure>

As expected, the _list of posts_ template will render a list of posts.
Clicking on the link for an individual post will replace the contents of
the application's outlet with the template for an individual post.

The template will look like this:

```handlebars
{{#each post in controller}}
<h1><a {{action 'showPost' post href=true}}>{{post.title}}</a></h1>
<div>{{post.intro}}</div>
{{/each}}
```

When clicking on a link for an individual post, the application will
move into the _individual post_ state, and replace `posts.handlebars` in
the application's outlet with `post.handlebars`.

<figure>
  <img src="/images/outlet-guide/individual-post.png">
</figure>

In this case, the individual post also has an outlet. In this case, the
outlet will allow the user to choose between viewing comments or
trackbacks.

The template for an individual post looks like this:

```handlebars
<h1>{{title}}</h1>

<div class="body">
  {{body}}
</div>

{{outlet}}
```

Again, the `{{outlet}}` simply specifies that the router will make the
decision about what to put in that area of the template.

Because `{{outlet}}` is a feature of all templates, as you go deeper
into the route hierarchy, each route will naturally control a smaller
part of the page.

## How it Works

Now that you understand the basic theory, let's take a look at how the
router controls your outlets (_for a more extensive treatment of the
Router, please consult the "Router Primer" guide_).

### Templates, Controllers, and Views

First, for every high-level handlebars template, you will also have a
view and a controller with the same name. For example:

* `application.handlebars`: the template for the main application view
* `App.ApplicationController`: the controller for the template. The
  initial variable context of `application.handlebars` is an instance of
  this controller.
* `App.ApplicationView`: the view object for the template.

In general, you will use view objects to handle events and controller
objects to provide data to your templates.

Ember provides two primary kinds of controllers, `ObjectController` and
`ArrayController`. These controllers serve as proxies for model objects
and lists of model objects.

We start with controllers rather than exposing the model objects
directly to your templates so that you have someplace to put
view-related computed properties and don't end up polluting your models
with view concerns.

You also connect `{{outlet}}`s using the template's associated
controller.

### The Router

Your application's router is responsible for moving your application
through its states in response to user action.

Let's start with a simple router:

```javascript
App.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      redirectsTo: 'posts'
    }),

    posts: Ember.Route.extend({
      route: '/posts'
    }),

    post: Ember.Route.extend({
      route: '/posts/:post_id'
    })
  })
});
```

This router sets up three top-level states: an index state, a state that
shows a list of posts, and a state that shows an individual post.

In our case, we'll simply redirect the index route to the `posts` state.
In other applications, you may want to have a dedicated home page.

So far, we have a list of states, and our app will dutifully enter the
`posts` state, but it doesn't do anything. When the application enters
the `posts` state, we want it to connect the `{{outlet}}` in the
application template. We accomplish this using the `connectOutlets`
callback.

```javascript
App.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      redirectsTo: 'posts'
    }),

    posts: Ember.Route.extend({
      route: '/posts',

      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('posts', App.Post.find());
      }
    }),

    post: Ember.Route.extend({
      route: '/posts/:post_id'
    })
  })
});
```

This connectOutlet call does a few things for us:

* It creates a new instance of `App.PostsView`, using the
  `posts.handlebars` template.
* It sets the `model` property of `postsController` to a list of all
  of the available posts (`App.Post.find()`) and makes `postsController`
  the controller for the new `App.PostsView`.
* It connects the new view to the outlet in `application.handlebars`.

In general, you should just think of these objects as operating in
tandem. You will always provide the model for a view's controller when
you create a view.

## Transitions and URLs

Next, we will want to provide a way for an application in the `posts`
state to move into the `post` state. We accomplish this by specifying a
transition.

```javascript
posts: Ember.Route.extend({
  route: '/posts',
  showPost: Ember.Route.transitionTo('post'),

  connectOutlets: function(router) {
    router.get('applicationController').connectOutlet('posts', App.Post.find());
  }
})
```

You invoke this transition by using the `{{action}}` helper in the
current template.

```handlebars
{{#each post in controller}}
  <h1><a {{action 'showPost' post href=true}}>{{post.title}}</a></h1>
{{/each}}
```

When a user clicks on a link with an `{{action}}` helper, Ember will
dispatch an event to the current state with the specified name. In this
case, the event is a transition.

Because we used a transition, Ember was also able to generate a URL for
this link. Ember uses the `id` property of the context to fill in the
`:post_id` dynamic segment of the `post` state.

Next, we will need to implement `connectOutlets` on the `post` state.
This time, the `connectOutlets` method will receive the post object
specified as the context to the `{{action}}` helper.

```javascript
post: Ember.Route.extend({
  route: '/posts/:post_id',

  connectOutlets: function(router, post) {
    router.get('applicationController').connectOutlet('post', post);
  }
})
```

To recap, the `connectOutlet` call performs a number of steps:

* It creates a new instance of `App.PostView`, using the
  `post.handlebars` template.
* It sets the `model` property of `postController` to the post that
  the user clicked on.
* It connects the new view to the outlet in `application.handlebars`.

You don't have to do anything else to get the link (`/posts/1`) to work
if the user saves it as a bookmark and comes back to it later.

If the user enters the page for the first time with the URL `/posts/1`,
the router will perform a few steps:

* Figure out what state the URL corresponds with (in this case, `post`)
* Extract the dynamic segment (in this case `:post_id`) from the URL and
  call `App.Post.find(post_id)`. This works using a naming convention:
  the `:post_id` dynamic segment corresponds to `App.Post`.
* Call `connectOutlets` with the return value of `App.Post.find`.

This means that regardless of whether the user enters the `post` state
from another part of the page or through a URL, the router will invoke
the `connectOutlets` method with the same object.

## Nesting

Finally, let's implement the comments and trackbacks functionality.

Because the `post` state uses the same pattern as the `root` state, it
will look very similar.

```javascript
post: Ember.Route.extend({
  route: '/posts/:post_id',

  connectOutlets: function(router, post) {
    router.get('applicationController').connectOutlet('post', post);
  },

  index: Ember.Route.extend({
    route: '/',
    redirectsTo: 'comments'
  }),

  comments: Ember.Route.extend({
    route: '/comments',
    showTrackbacks: Ember.Route.transitionTo('trackbacks'),

    connectOutlets: function(router) {
      var postController = router.get('postController');
      postController.connectOutlet('comments', postController.get('comments'));
    }
  }),

  trackbacks: Ember.Route.extend({
    route: '/trackbacks',
    showComments: Ember.Route.transitionTo('comments'),

    connectOutlets: function(router) {
      var postController = router.get('postController');
      postController.connectOutlet('trackbacks', postController.get('trackbacks'));
    }
  })
})
```

There are only a few changes here:

* We specify the `showTrackbacks` and `showComments` transitions only in
  the states where transitioning makes sense.
* Since we are setting the view for the outlet in `post.handlebars`, we
  call `connectOutlet` on `postController`
* In this case, we get the content for the `commentsController` and
  `trackbacksController` from the current post. The `postController` is
  a proxy for the underlying Post, so we can retrieve the associations
  directly from the `postController`.

Here's the template for an individual post.

```handlebars
<h1>{{title}}</h1>

<div class="body">
  {{body}}
</div>

<p>
  <a {{action 'showComments' href=true}}>Comments</a> |
  <a {{action 'showTrackbacks' href=true}}>Trackbacks</a>
</p>

{{outlet}}
```

And finally, coming back from a bookmarked link will work fine with this
nested setup. Let's take a look at what happens when the user enters the
site at `/posts/1/trackbacks`.

* The router determines what state the URL corresponds with
  (`post.trackbacks`), and enters the state.
* For each state along the way, the router extracts any dynamic segments
  and calls `connectOutlets`. This mirrors the path a user would take as
  they move through the application. As before, the router will call the
  `connectOutlet` method on the post with `App.Post.find(1)`.
* When the router gets to the trackbacks state, it will invoke
  `connectOutlets`. Because the `connectOutlets` method for `post` has
  set the `model` of the `postController`, the trackbacks state will
  retrieve the association.

Again, because of the way the `connectOutlets` callback works with
dynamic URL segments, the URL generated by an `{{action}}` helper is
guaranteed to work later.

## Asynchrony

One final point: you might be asking yourself how this system can work
if the app has not yet loaded Post 1 by the time `App.Post.find(1)` is
called.

The reason this works is that `ember-data` always returns an object
immediately, even if it needs to kick off a query. That object starts
off with an empty `data` hash. When the server returns the data,
ember-data updates the object's `data`, which also triggers bindings on
all defined attributes (properties defined using `DS.attr`).

When you ask this object for its `trackbacks`, it will likewise return
an empty `ManyArray`. When the server returns the associated content
along with the post, ember-data will also automatically update the
`trackbacks` array.

In your `trackbacks.handlebars` template, you will have done something
like:

```handlebars
<ul>
{{#each trackback in controller}}
  <li><a {{bind-attr href="trackback.url"}}>{{trackback.title}}</a></li>
{{/each}}
</ul>
```

When ember-data updates the `trackbacks` array, the change will
propagate through the `trackbacksController` and into the DOM.

You may also want to avoid showing partial data that is not yet loaded.
In that case, you could do something like:

```handlebars
<ul>
{{#if controller.isLoaded}}
  {{#each trackback in controller}}
    <li><a {{bind-attr href="trackback.url"}}>{{trackback.title}}</a></li>
  {{/each}}
{{else}}
  <li><img src="/spinner.gif"> Loading trackbacks...</li>
{{/if}}
</ul>
```

When ember-data populates the `ManyArray` for the trackbacks from the
server-provided data, it also sets the `isLoaded` property. Because all
template constructs, including `#if` automatically update the DOM if the
underlying property changes, this will "just work".
