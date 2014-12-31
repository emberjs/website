This guide goes into extreme detail about the Ember.js view layer. It is
intended for an experienced Ember developer, and includes details that
are unnecessary for getting started with Ember.

Ember.js has a sophisticated system for creating, managing and rendering a hierarchy of views that connect to the browser's DOM. Views are responsible for responding to user events, like clicks, drags, and scrolls, as well as updating the contents of the DOM when the data underlying the view changes.

View hierarchies are usually created by evaluating a Handlebars template. As the template is evaluated, child views are added. As the templates for _those_ child views are evaluated, they may have child views added, and so on, until an entire hierarchy is created.

Even if you do not explicitly create child views from your Handlebars templates, Ember.js internally uses the view system to update bound values. For example, every Handlebars expression `{{value}}` creates a view behind-the-scenes that knows how to update the bound value if it changes.

You can also dynamically make changes to the view hierarchy at application runtime using the `Ember.ContainerView` class. Rather than being template-driven, a container view exposes an array of child view instances that can be manually managed.

Views and templates work in tandem to provide a robust system for creating whatever user interface you dream up. End users should be isolated from the complexities of things like timing issues while rendering and event propagation. Application developers should be able to describe their UI once, as a string of Handlebars markup, and then carry on with their application without having to worry about making sure that it remains up-to-date.

### What problems does it solve?

#### Child Views

In a typical client-side application, views may represent elements nested inside of each other in the DOM. In the naïve solution to this problem, separate view objects represent each DOM element, and ad-hoc references help the various view objects keep track of the views conceptually nested inside of them.

Here is a simple example, representing one main app view, a collection nested inside of it, and individual items nested inside of the collection.

<figure>
  <img src="/images/view-guide/view-hierarchy-simple.png">
</figure>

This system works well at first glance, but imagine that we want to open Joe's Lamprey Shack at 8am instead of 9am. In this situation, we will want to re-render the App View. Because the developer needed to build up the references to the children on an ad-hoc basis, this re-rendering process has several problems.

In order to re-render the App View, the App View must also manually re-render the child views and re-insert them into App View's element. If implemented perfectly, this process works well, but it relies upon a perfect, ad hoc implementation of a view hierarchy. If any single view fails to implement this precisely, the entire re-render will fail.

In order to avoid these problems, Ember's view hierarchy has the concept of child views baked in.

<figure>
  <img src="/images/view-guide/view-hierarchy-ember.png">
</figure>

When the App View re-renders, Ember is responsible for re-rendering and inserting the child views, not application code. This also means that Ember can perform any memory management for you, such as cleaning up observers and bindings.

Not only does this eliminate quite a bit of boilerplate code, but it eliminates the possibility that an imperfectly implemented view hierarchy will cause unexpected failures.

#### Event Delegation

In the past, web developers have added event listeners to individual elements in order to know when the user interacts with them. For example, you might have a `<div>` element on which you register a function that gets called when the user clicks it.

However, this approach often does not scale when dealing with large numbers of interactive elements. For example, imagine a `<ul>` with 100 `<li>`s in it, with a delete button next to each item. Since the behavior is the same for all of these items, it would be inefficient to create 100 event listeners, one for each delete button.

<figure>
  <img src="/images/view-guide/undelegated.png">
</figure>

To solve this problem, developers discovered a technique called "event delegation". Instead of registering a listener on each element in question, you can register a single listener for the containing element and use `event.target` to identify which element the user clicked on.

<figure>
  <img src="/images/view-guide/delegated.png">
</figure>

Implementing this is a bit tricky, because some events (like `focus`, `blur` and `change`) don't bubble. Fortunately, jQuery has solved this problem thoroughly; using jQuery's `on` method reliably works for all native browser events.

Other JavaScript frameworks tackle this problem in one of two ways. In the first approach, they ask you to implement the naïve solution yourself, creating a separate view for each element. When you create the view, it sets up an event listener on the view's element. If you had a list of 500 items, you would create 500 views and each would set up a listener on its own element.

In the second approach, the framework builds in event delegation at the view level. When creating a view, you can supply a list of events to delegate and a method to call when the event occurs. This leaves identifying the context of the click (for example, which item in the list) to the method receiving the event.

You are now faced with an uncomfortable choice: create a new view for each item and lose the benefits of event delegation, or create a single view for all of the items and have to store information about the underlying JavaScript object in the DOM.

In order to solve this problem, Ember delegates all events to the application's root element (usually the document `body`) using jQuery. When an event occurs, Ember identifies the nearest view that handles the event and invokes its event handler. This means that you can create views to hold a JavaScript context, but still get the benefit of event delegation.

Further, because Ember registers only one event for the entire Ember application, creating new views never requires setting up event listeners, making re-renders efficient and less error-prone. When a view has child views, this also means that there is no need to manually undelegate views that the re-render process replaces.

#### The Rendering Pipeline

Most web applications specify their user interface using the markup of a particular templating language. For Ember.js, we've done the work to make templates written using the Handlebars templating language automatically update when the values used inside of them are changed.

While the process of displaying a template is automatic for developers, under the hood there are a series of steps that must be taken to go from the original template to the final, live DOM representation that the user sees.

This is the approximate lifecycle of an Ember view:

<figure>
  <img src="/images/view-guide/view-lifecycle-ember.png">
</figure>

##### 1. Template Compilation

The application's templates are loaded over the network or as part of the application payload in string form. When the application loads, it sends the template string to Handlebars to be compiled into a function. Once compiled, the template function is saved, and can be used by multiple views repeatedly, each time they need to re-render.

This step may be omitted in applications where the templates are pre-compiled on the server. In those cases, the template is transferred not as the original, human-readable template string but as the compiled code.

Because Ember is responsible for template compilation, you don't have to do any additional work to ensure that compiled templates are reused.

##### 2. String Concatenation

A view's rendering process is kickstarted when the application calls `append` or `appendTo` on the view. Calling `append` or `appendTo` **schedules** the view to be rendered and inserted later. This allows any deferred logic in your application (such as binding synchronization) to happen before rendering the element.

To begin the rendering process, Ember creates a `RenderBuffer` and gives it to the view to append its contents to. During this process, a view can create and render child views. When it does so, the parent view creates and assigns a `RenderBuffer` for the child, and links it to the parent's `RenderBuffer`.

Ember flushes the binding synchronization queue before rendering each view. By syncing bindings before rendering each view, Ember guarantees that it will not render stale data it needs to replace right away.

Once the main view has finished rendering, the render process has created a tree of views (the "view hierarchy"), linked to a tree of buffers. By walking down the tree of buffers and converting them into Strings, we have a String that we can insert into the DOM.

Here is a simple example:

<figure>
  <img src="/images/view-guide/render-buffer.png">
</figure>

In addition to children (Strings and other `RenderBuffer`s), a `RenderBuffer` also encapsulates the element's tag name, id, classes, style, and other attributes. This makes it possible for the render process to modify one of these properties (style, for example), even after its child Strings have rendered. Because many of these properties are controlled via bindings (e.g. using `bind-attr`), this makes the process robust and transparent.

##### 3. Element Creation and Insertion

At the end of the rendering process, the root view asks the `RenderBuffer` for its element. The `RenderBuffer` takes its completed string and uses jQuery to convert it into an element. The view assigns that element to its `element` property and places it into the correct place in the DOM (the location specified in `appendTo` or the application's root element if the application used `append`).

While the parent view assigns its element directly, each child view looks up its element lazily. It does this by looking for an element whose `id` matches its `elementId` property. Unless explicitly provided, the rendering process generates an `elementId` property and assigns its value to the view's `RenderBuffer`, which allows the view to find its element as needed.

##### 4. Re-Rendering

After the view inserts itself into the DOM, either Ember or the application may want to re-render the view. They can trigger a re-render by calling the `rerender` method on a view.

Rerendering will repeat steps 2 and 3 above, with two exceptions:

* Instead of inserting the element into an explicitly specified location, `rerender` replaces the existing element with the new element.
* In addition to rendering a new element, it also removes the old element and destroys its children. This allows Ember to automatically handle unregistering appropriate bindings and observers when re-rendering a view. This makes observers on a path more viable, because the process of registering and unregistering all of the nested observers is automatic.

The most common cause of a view re-render is when the value bound to a Handlebars expression (`{{foo}}`) changes. Internally, Ember creates a simple view for each expression, and registers an observer on the path. When the path changes, Ember updates the area of the DOM with the new value.

Another common case is an `{{#if}}` or `{{#with}}` block. When rendering a template, Ember creates a virtual view for these block helpers. These virtual views do not appear in the publicly available view hierarchy (when getting `parentView` and `childViews` from a view), but they exist to enable consistent re-rendering.

When the path passed to an `{{#if}}` or `{{#with}}` changes, Ember automatically re-renders the virtual view, which will replace its contents, and importantly, destroy all child views to free up their memory.

In addition to these cases, the application may sometimes want to explicitly re-render a view (usually a `ContainerView`, see below). In this case, the application can call `rerender` directly, and Ember will queue up a re-rendering job, with the same semantics.

The process looks something like:

<figure>
  <img src="/images/view-guide/re-render.png">
</figure>

### The View Hierarchy

#### Parent and Child Views

As Ember renders a templated view, it will generate a view hierarchy. Let's assume we have a template `form`.

```handlebars
{{view "search" placeholder="Search"}}
{{#view view.buttonView}}Go!{{/view}}
```

And we insert it into the DOM like this:

```javascript
var view = Ember.View.create({
  templateName: 'form',
  buttonView: Ember.Button
}).append();
```

This will create a small view hierarchy that looks like this:

<figure>
  <img src="/images/view-guide/simple-view-hierarchy.png">
</figure>

You can move around in the view hierarchy using the `parentView` and `childViews` properties.

```javascript
var children = view.get('childViews') // [ <App.Search>, <Ember.Button> ]
children.objectAt(0).get('parentView') // view
```

One common use of the `parentView` method is inside of an instance of a child view.

```javascript
App.Search = Ember.View.extend({
  didInsertElement: function() {
    // this.get('parentView') in here references `view`
  }
})
```

#### Lifecycle Hooks

In order to make it easy to take action at different points during your view's lifecycle, there are several hooks you can implement.

* `willInsertElement`: This hook is called after the view has been rendered, but before it has been inserted into the DOM. It does not provide access to the view's `element`.
* `didInsertElement`: This hook is called immediately after the view has been inserted into the DOM. It provides access to the view's `element` and is most useful for integration with an external library. Any explicit DOM setup code should be limited to this hook.
* `willDestroyElement`: This hook is called immediately before the element is removed from the DOM. This is your opportunity to tear down any external state associated with the DOM node. Like `didInsertElement`, it is most useful for integration with external libraries.
* `willClearRender`: This hook is called immediately before a view is re-rendered. This is useful if you want to perform some teardown immediately before a view is re-rendered.
* `becameVisible`: This hook is called after a view's `isVisible` property, or one of its ancestor's `isVisible` property, changes to true and the associated element becomes visible. Note that this hook is only reliable if all visibility is routed through the `isVisible` property.
* `becameHidden`: This hook is called after a view's `isVisible` property, or one of its ancestor's `isVisible` property, changes to false and the associated element becomes hidden. Note that this hook is only reliable if all visibility is routed through the `isVisible` property.

Apps can implement these hooks by defining a method by the hook's name on the view. Alternatively, it is possible to register a listener for the hook on a view:

```javascript
view.on('willClearRender', function() {
  // do something with view
});
```

#### Virtual Views

As described above, Handlebars creates views in the view hierarchy to
represent bound values. Every time you use a Handlebars expression,
whether it's a simple value or a block helper like `{{#with}}` or
`{{#if}}`, Handlebars creates a new view.

Because Ember uses these views for internal bookkeeping only,
they are hidden from the view's public `parentView` and `childViews`
API. The public view hierarchy reflects only views created using the
`{{view}}` helper or through `ContainerView` (see below).

For example, consider the following Handlebars template:

```handlebars
<h1>Joe's Lamprey Shack</h1>
{{restaurantHours}}

{{#view "fdaContactForm"}}
  If you are experiencing discomfort from eating at Joe's Lamprey Shack,
please use the form below to submit a complaint to the FDA.

  {{#if allowComplaints}}
    {{input value="complaint"}}
    <button {{action "submitComplaint"}}>Submit</button>
  {{/if}}
{{/view}}
```

Rendering this template would create a hierarchy like this:

<figure>
  <img src="/images/view-guide/public-view-hierarchy.png">
</figure>

Behind the scenes, Ember tracks additional virtual views for the
Handlebars expressions:

<figure>
  <img src="/images/view-guide/virtual-view-hierarchy.png">
</figure>

From inside of the `TextArea`, the `parentView` would point to the
`FdaContactForm` and the `FdaContactForm`'s `childViews` would be an
array of the single `TextArea` view.

You can see the internal view hierarchy by asking for the `_parentView`
or `_childViews`, which will include virtual views:

```javascript
var _childViews = view.get('_childViews');
console.log(_childViews.objectAt(0).toString());
//> <Ember._HandlebarsBoundView:ember1234>
```

**Warning!** You may not rely on these internal APIs in application code.
They may change at any time and have no public contract. The return
value may not be observable or bindable. It may not be an Ember object.
If you feel the need to use them, please contact us so we can expose a better
public API for your use-case.

Bottom line: This API is like XML. If you think you have a use for it,
you may not yet understand the problem enough. Reconsider!

#### Event Bubbling

One responsibility of views is to respond to primitive user events
and translate them into events that have semantic meaning for your
application.

For example, a delete button translates the primitive `click` event into
the application-specific "remove this item from an array."

In order to respond to user events, create a new view subclass that
implements that event as a method:

```javascript
App.DeleteButton = Ember.View.create({
  click: function(event) {
    var item = this.get('model');
    this.get('controller').send('deleteItem', item);
  }
});
```

When you create a new `Ember.Application` instance, it registers an event
handler for each native browser event using jQuery's event delegation
API. When the user triggers an event, the application's event dispatcher
will find the view nearest to the event target that implements the
event.

A view implements an event by defining a method corresponding to the
event name. When the event name is made up of multiple words (like
`mouseup`) the method name should be the camelized form of the event
name (`mouseUp`).

Events will bubble up the view hierarchy until the event reaches the
root view. An event handler can stop propagation using the same
techniques as normal jQuery event handlers:

* `return false` from the method
* `event.stopPropagation`

For example, imagine you defined the following view classes:

```javascript
App.GrandparentView = Ember.View.extend({
  click: function() {
    console.log('Grandparent!');
  }
});

App.ParentView = Ember.View.extend({
  click: function() {
    console.log('Parent!');
    return false;
  }
});

App.ChildView = Ember.View.extend({
  click: function() {
    console.log('Child!');
  }
});
```

And here's the Handlebars template that uses them:

```handlebars
{{#view "grandparent"}}
  {{#view "parent"}}
    {{#view "child"}}
      <h1>Click me!</h1>
    {{/view}}
  {{/view}}
{{/view}}
```

If you clicked on the `<h1>`, you'd see the following output in your
browser's console:

```
Child!
Parent!
```

You can see that Ember invokes the handler on the child-most view that
received the event. The event continues to bubble to the `ParentView`,
but does not reach the `GrandparentView` because `ParentView` returns
false from its event handler.

You can use normal event bubbling techniques to implement familiar
patterns. For example, you could implement a `FormView` that defines a
`submit` method. Because the browser triggers the `submit` event when
the user hits enter in a text field, defining a `submit` method on the
form view will "just work".

```javascript
App.FormView = Ember.View.extend({
  tagName: "form",

  submit: function(event) {
    // will be invoked whenever the user triggers
    // the browser's `submit` method
  }
});
```

```handlebars
{{#view "form"}}
  {{input value=firstName}}
  {{input value=lastName}}
  <button type="submit">Done</button>
{{/view}}
```

#### Adding New Events

Ember comes with built-in support for the following native browser
events:

<table class="figure">
  <thead>
    <tr><th>Event Name</th><th>Method Name</th></tr>
  </thead>
  <tbody>
    <tr><td>touchstart</td><td>touchStart</td></tr>
    <tr><td>touchmove</td><td>touchMove</td></tr>
    <tr><td>touchend</td><td>touchEnd</td></tr>
    <tr><td>touchcancel</td><td>touchCancel</td></tr>
    <tr><td>keydown</td><td>keyDown</td></tr>
    <tr><td>keyup</td><td>keyUp</td></tr>
    <tr><td>keypress</td><td>keyPress</td></tr>
    <tr><td>mousedown</td><td>mouseDown</td></tr>
    <tr><td>mouseup</td><td>mouseUp</td></tr>
    <tr><td>contextmenu</td><td>contextMenu</td></tr>
    <tr><td>click</td><td>click</td></tr>
    <tr><td>dblclick</td><td>doubleClick</td></tr>
    <tr><td>mousemove</td><td>mouseMove</td></tr>
    <tr><td>focusin</td><td>focusIn</td></tr>
    <tr><td>focusout</td><td>focusOut</td></tr>
    <tr><td>mouseenter</td><td>mouseEnter</td></tr>
    <tr><td>mouseleave</td><td>mouseLeave</td></tr>
    <tr><td>submit</td><td>submit</td></tr>
    <tr><td>change</td><td>change</td></tr>
    <tr><td>dragstart</td><td>dragStart</td></tr>
    <tr><td>drag</td><td>drag</td></tr>
    <tr><td>dragenter</td><td>dragEnter</td></tr>
    <tr><td>dragleave</td><td>dragLeave</td></tr>
    <tr><td>dragover</td><td>dragOver</td></tr>
    <tr><td>drop</td><td>drop</td></tr>
    <tr><td>dragend</td><td>dragEnd</td></tr>
  </tbody>
</table>

You can add additional events to the event dispatcher when you create a
new application:

```javascript
App = Ember.Application.create({
  customEvents: {
    // add support for the loadedmetadata media
    // player event
    'loadedmetadata': "loadedMetadata"
  }
});
```

In order for this to work for a custom event, the HTML5 spec must define
the event as "bubbling", or jQuery must have provided an event
delegation shim for the event.

### Templated Views

As you've seen so far in this guide, the majority of views that you will
use in your application are backed by a template. When using templates,
you do not need to programmatically create your view hierarchy because
the template creates it for you.

While rendering, the view's template can append views to its child views
array. Internally, the template's `{{view}}` helper calls the view's
`appendChild` method.

Calling `appendChild` does two things:

1. Adds the child view to the `childViews` array.
2. Immediately renders the child view and adds it to the parent's render
   buffer.

<figure>
  <img src="/images/view-guide/template-appendChild-interaction.png">
</figure>

You may not call `appendChild` on a view after it has left the rendering
state. A template renders "mixed content" (both views and plain text) so
the parent view does not know exactly where to insert the new child view
once the rendering process has completed.

In the example above, imagine trying to insert a new view inside of
the parent view's `childViews` array. Should it go immediately
after the closing `</div>` of `App.MyView`? Or should it go after the
closing `</div>` of the entire view? There is no good answer that will
always be correct.

Because of this ambiguity, the only way to create a view hierarchy using
templates is via the `{{view}}` helper, which always inserts views
in the right place relative to any plain text.

While this works for most situations, occasionally you may want to have
direct, programmatic control of a view's children. In that case, you can
use `Ember.ContainerView`, which explicitly exposes a public API for
doing so.

### Container Views

Container views contain no plain text. They are composed entirely of
their child views (which may themselves be template-backed).

`ContainerView` exposes two public APIs for changing its contents:

1. A writable `childViews` array into which you can insert `Ember.View`
   instances.
2. A `currentView` property that, when set, inserts the new value into
   the child views array. If there was a previous value of
   `currentView`, it is removed from the `childViews` array.

Here is an example of using the `childViews` API to create a view that
starts with a hypothetical `DescriptionView` and can add a new button at
any time by calling the `addButton` method:

```javascript
App.ToolbarView = Ember.ContainerView.create({
  init: function() {
    var childViews = this.get('childViews');
    var descriptionView = App.DescriptionView.create();

    childViews.pushObject(descriptionView);
    this.addButton();

    return this._super();
  },

  addButton: function() {
    var childViews = this.get('childViews');
    var button = Ember.ButtonView.create();

    childViews.pushObject(button);
  }
});
```

As you can see in the example above, we initialize the `ContainerView`
with two views, and can add additional views during runtime. There is a
convenient shorthand for doing this view setup without having to
override the `init` method:

```javascript
App.ToolbarView = Ember.ContainerView.create({
  childViews: ['descriptionView', 'buttonView'],

  descriptionView: App.DescriptionView,
  buttonView: Ember.ButtonView,

  addButton: function() {
    var childViews = this.get('childViews');
    var button = Ember.ButtonView.create();

    childViews.pushObject(button);
  }
});
```

As you can see above, when using this shorthand, you specify the
`childViews` as an array of strings. At initialization time, each of the
strings is used as a key to look up a view instance or class. That view
is automatically instantiated, if necessary, and added to the
`childViews` array.

<figure>
  <img src="/images/view-guide/container-view-shorthand.png">
</figure>

### Template Scopes

Standard Handlebars templates have the concept of a *context*--the
object from which expressions will be looked up.

When a Handlebars template in an Ember app uses an expression
(`{{#if foo.bar}}`), Ember will automatically set up an
observer for that path on the current context.

If the object referenced by the path changes, Ember will automatically
re-render the block with the appropriate context. In the case of a
context-preserving helper, Ember will re-use the original context when
re-rendering the block. Otherwise, Ember will use the new value of the
path as the context.

```handlebars
{{#if controller.isAuthenticated}}
  <h1>Welcome {{controller.name}}</h1>
{{/if}}
```

In the above template, when the `isAuthenticated` property changes from
false to true, Ember will render the block, using the original outer
scope as its context.

#### View Scope

In addition to the Handlebars context, templates in Ember also have the
notion of the current view. No matter what the current context is, the
`view` property always references the closest view.

Note that the `view` property never references the internal views
created for block expressions like `{{#if}}`. This allows you to
differentiate between Handlebars contexts, which always work the way
they do in vanilla Handlebars, and the view hierarchy.

Because `view` points to an `Ember.View` instance, you can access any
properties on the view by using an expression like `view.propertyName`.
You can get access to a view's parent using `view.parentView`.

For example, imagine you had a view with the following properties:

```javascript
App.MenuItemView = Ember.View.create({
  templateName: 'menu_item_view',
  bulletText: '*'
});
```

…and the following template:

```handlebars
{{view.bulletText}} {{name}}
```

You can still access the view's `bulletText` by referencing `view.bulletText`.

### Template Variables

So far in this guide, we've been handwaving around the use of the
`controller` property in our Handlebars templates. Where does it come
from?

Handlebars contexts in Ember can inherit variables from their parent
contexts. Before Ember looks up a variable in the current context, it
first checks in its template variables. As a template creates new
Handlebars scope, they automatically inherit the variables from their
parent scope.

Ember defines these `view` and `controller` variables, so they are
always found first when an expression uses the `view` or `controller`
names.

As described above, Ember sets the `view` variable on the Handlebars
context whenever a template uses the `{{#view}}` helper. Initially,
Ember sets the `view` variable to the view rendering the template.

Ember sets the `controller` variable on the Handlebars context whenever
a rendered view has a `controller` property. If a view has no
`controller` property, it inherits the `controller` variable from the
most recent view with one.

#### Other Variables

Handlebars helpers in Ember may also specify variables. For example, the
`{{#with controller.person as tom}}` form specifies a `tom` variable
that descendent scopes can access. Even if a child context has a `tom`
property, the `tom` variable will supersede it.

This form has one major benefit: it allows you to shorten long paths
without losing access to the parent scope.

It is especially important in the `{{#each}}` helper, which provides
the `{{#each person in people}}` form.
In this form, descendent context have access to the `person` variable,
but remain in the same scope as where the template invoked the `each`.

```handlebars
<h1>Title</h1>
<ul>
{{#each person in controller.people}}
  {{! prefix here is controller.preferences.prefix }}
  <li>{{prefix}}: {{person.fullName}}</li>
{{/each}}
<ul>
```

Note that these variables inherit through `ContainerView`s, even though
they are not part of the Handlebars context hierarchy.

#### Accessing Template Variables from Views

In most cases, you will need to access these template variables from
inside your templates. In some unusual cases, you may want to access the
variables in-scope from your view's JavaScript code.

You can do this by accessing the view's `templateVariables` property,
which will return a JavaScript object containing the variables that were
in scope when the view was rendered. `ContainerView`s also have access
to this property, which references the template variables in the most
recent template-backed view.

At present, you may not observe or bind a path containing
`templateVariables`.
