Many Ember concepts, like bindings and computed properties, are designed
to help manage asynchronous behavior.

### Without Ember

We'll start by taking a look at ways to manage asynchronous behavior
using jQuery or event-based MVC frameworks.

Let's use the most common asynchronous behavior in a web application,
making an Ajax request, as an example. The browser APIs for making Ajax
requests provide an asynchronous API. jQuery's wrapper does as well:

```javascript
jQuery.getJSON('/posts/1', function(post) {
  $("#post").html("<h1>" + post.title + "</h1>" +
    "<div>" + post.body + "</div>");
});
```

In a raw jQuery application, you would use this callback to make
whatever changes you needed to make to the DOM.

When using an event-based MVC framework, you move the logic out of the
callback and into model and view objects. This improves things, but
doesn't get rid of the need to explicitly deal with asynchronous
callbacks:

```javascript
Post = Model.extend({
  author: function() {
    return [this.salutation, this.name].join(' ')
  },

  toJSON: function() {
    var json = Model.prototype.toJSON.call(this);
    json.author = this.author();
    return json;
  }
});

PostView = View.extend({
  init: function(model) {
    model.bind('change', this.render, this);
  },

  template: _.template("<h1><%= title %></h1><h2><%= author %></h2><div><%= body %></div>"),

  render: function() {
    jQuery(this.element).html(this.template(this.model.toJSON());
    return this;
  }
});

var post = Post.create();
var postView = PostView.create({ model: post });
jQuery('#posts').append(postView.render().el);

jQuery.getJSON('/posts/1', function(json) {
  // set all of the JSON properties on the model
  post.set(json);
});
```

This example doesn't use any particular JavaScript library beyond
jQuery, but its approach is typical of event-driven MVC frameworks. It
helps organize the asynchronous events, but asynchronous behavior is
still the core programming model.

### Ember's Approach

In general, Ember's goal is to eliminate explicit forms of asynchronous
behavior. As we'll see later, this gives Ember the ability to coalesce
multiple events that have the same result.

It also provides a higher level of abstraction, eliminating the need to
manually register and unregister event listeners to perform most common
tasks.

You would normally use ember-data for this example, but let's see how
you would model the above example using jQuery for Ajax in Ember.

```javascript
App.Post = Ember.Object.extend({
  
});

App.PostController = Ember.ObjectController.extend({
  author: function() {
    return [this.get('salutation'), this.get('name')].join(' ');
  }.property('salutation', 'name')
});

App.PostView = Ember.View.extend({
  // the controller is the initial context for the template
  controller: null,
  template: Ember.Handlebars.compile("<h1>{{title}}</h1><h2>{{author}}</h2><div>{{body}}</div>")
});

var post = App.Post.create();
var postController = App.PostController.create({ model: post });

App.PostView.create({ controller: postController }).appendTo('body');

jQuery.getJSON("/posts/1", function(json) {
  post.setProperties(json);
});
```

In contrast to the above examples, the Ember approach eliminates the
need to explicitly register an observer when the `post`'s properties
change.

The `{{title}}`, `{{author}}` and `{{body}}` template elements are bound
to those properties on the `PostController`. When the `PostController`'s
model changes, it automatically propagates those changes to the DOM.

Using a computed property for `author` eliminated the need to explicitly
invoke the computation in a callback when the underlying property
changed.

Instead, Ember's binding system automatically follows the trail from the
`salutation` and `name` set in the `getJSON` callback to the computed
property in the `PostController` and all the way into the DOM.

### Benefits

Because Ember is usually responsible for propagating changes, it can
guarantee that a single change is only propagated one time in response
to each user event.

Let's take another look at the `author` computed property.

```javascript
App.PostController = Ember.ObjectController.extend({
  author: function() {
    return [this.get('salutation'), this.get('name')].join(' ');
  }.property('salutation', 'name')
});
```

Because we have specified that it depends on both `salutation` and
`name`, changes to either of those two dependencies will invalidate the
property, which will trigger an update to the `{{author}}` property in
the DOM.

Imagine that in response to a user event, I do something like this:

```javascript
post.set('salutation', "Mrs.");
post.set('name', "Katz");
```

You might imagine that these changes will cause the computed property to
be invalidated twice, causing two updates to the DOM. And in fact, that
is exactly what would happen when using an event-driven framework.

In Ember, the computed property will only recompute once, and the DOM
will only update once.

How?

When you make a change to a property in Ember, it does not immediately
propagate that change. Instead, it invalidates any dependent properties
immediately, but queues the actual change to happen later.

Changing both the `salutation` and `name` properties invalidates the
`author` property twice, but the queue is smart enough to coalesce those
changes.

Once all of the event handlers for the current user event have finished,
Ember flushes the queue, propagating the changes downward. In this case,
that means that the invalidated `author` property will invalidate the
`{{author}}` in the DOM, which will make a single request to recompute
the information and update itself once.

**This mechanism is fundamental to Ember.** In Ember, you should always
assume that the side-effects of a change you make will happen later. By
making that assumption, you allow Ember to coalesce repetitions of the
same side-effect into a single call.

In general, the goal of evented systems is to decouple the data
manipulation from the side effects produced by listeners, so you
shouldn't assume synchronous side effects even in a more event-focused
system. The fact that side effects don't propagate immediately in Ember
eliminates the temptation to cheat and accidentally couple code together
that should be separate.

### Side-Effect Callbacks

Since you can't rely on synchronous side-effects, you may be wondering
how to make sure that certain actions happen at the right time.

For example, imagine that you have a view that contains a button, and
you want to use jQuery UI to style the button. Since a view's `append`
method, like everything else in Ember, defers its side-effects, how can
you execute the jQuery UI code at the right time?

The answer is lifecycle callbacks.

```javascript
App.Button = Ember.View.extend({
  tagName: 'button',
  template: Ember.Handlebars.compile("{{view.title}}"),

  didInsertElement: function() {
    this.$().button();
  }
});

var button = App.Button.create({
  title: "Hi jQuery UI!"
}).appendTo('#something');
```

In this case, as soon as the button actually appears in the DOM, Ember
will trigger the `didInsertElement` callback, and you can do whatever
work you want.

The lifecycle callbacks approach has several benefits, even if we didn't
have to worry about deferred insertion.

*First*, relying on synchronous insertion means leaving it up to the
caller of `appendTo` to trigger any behavior that needs to run
immediately after appending. As your application grows, you may find
that you create the same view in many places, and now need to worry
about that concern everywhere.

The lifecycle callback eliminates the coupling between the code that
instantiates the view and its post-append behavior. In general, we find
that making it impossible to rely on synchronous side-effects leads to
better design in general.

*Second*, because everything about the lifecycle of a view is inside the
view itself, it is very easy for Ember to re-render parts of the DOM
on-demand.

For example, if this button was inside of an `{{#if}}` block, and Ember
needed to switch from the main branch to the `else` section, Ember can
easily instantiate the view and call the lifecycle callbacks.

Because Ember forces you to define a fully-defined view, it can take
control of creating and inserting views in appropriate situations.

This also means that all of the code for working with the DOM is in a
few sanctioned parts of your application, so Ember has more freedom in
the parts of the render process outside of these callbacks.

### Observers

In some rare cases, you will want to perform certain behavior after a
property's changes have propagated. As in the previous section, Ember
provides a mechanism to hook into the property change notifications.

Let's go back to our salutation example.

```javascript
App.PostController = Ember.ObjectController.extend({
  author: function() {
    return [this.get('salutation'), this.get('name')].join(' ');
  }.property('salutation', 'name')
});
```

If we want to be notified when the author changes, we can register an
observer. Let's say that the view object wants to be notified:

```javascript
App.PostView = Ember.View.extend({
  controller: null,
  template: Ember.Handlebars.compile("<h1>{{title}}</h1><h2>{{author}}</h2><div>{{body}}</div>"),

  authorDidChange: function() {
    alert("New author name: " + this.get('controller.author'));
  }.observes('controller.author')
});
```

Ember triggers observers after it successfully propagates the change. In
this case, that means that Ember will only call the `authorDidChange`
callback once in response to each user event, even if both of `salutation`
and `name` changed.

This gives you the benefits of executing code after the property has
changed, without forcing all property changes to be synchronous. This
basically means that if you need to do some manual work in response to a
change in a computed property, you get the same coalescing benefits as
Ember's binding system.

Finally, you can also register observers manually, outside of an object
definition:

```javascript
App.PostView = Ember.View.extend({
  controller: null,
  template: Ember.Handlebars.compile("<h1>{{title}}</h1><h2>{{author}}</h2><div>{{body}}</div>"),

  didInsertElement: function() {
    this.addObserver('controller.author', function() {
      alert("New author name: " + this.get('controller.author'));
    });
  }
});
```

However, when you use the object definition syntax, Ember will
automatically tear down the observers when the object is destroyed. For
example, if an `{{#if}}` statement changes from truthy to falsy, Ember
destroys all of the views defined inside the block. As part of that
process, Ember also disconnects all bindings and inline observers.

If you define an observer manually, you need to make sure you remove it.
In general, you will want to remove observers in the opposite callback
to when you created it. In this case, you will want to remove the
callback in `willDestroyElement`.

```javascript
App.PostView = Ember.View.extend({
  controller: null,
  template: Ember.Handlebars.compile("<h1>{{title}}</h1><h2>{{author}}</h2><div>{{body}}</div>"),

  didInsertElement: function() {
    this.addObserver('controller.author', function() {
      alert("New author name: " + this.get('controller.author'));
    });
  },

  willDestroyElement: function() {
    this.removeObserver('controller.author');
  }
});
```

If you added the observer in the `init` method, you would want to tear
it down in the `willDestroy` callback.

In general, you will very rarely want to register a manual observer in
this way. Because of the memory management guarantees, we strongly
recommend that you define your observers as part of the object
definition if possible.

### Routing

There's an entire page dedicated to managing async within the Ember
Router: [Asynchronous Routing](/guides/routing/asynchronous-routing)
