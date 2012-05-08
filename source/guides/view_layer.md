# The Ember.js View Layer

Ember.js has a sophisticated system for creating, managing and rendering a hierarchy of views that connect to the browser's DOM. Views are responsible for responding to user events, like clicks, drags, and scrolls, as well as updating the contents of the DOM when the data underlying the view changes.

View hierarchies are usually created by evaluating a Handlebars template. As the template is evaluated, child views are added. As the templates for _those_ child views are evaluated, they may have child views added, and so on, until an entire hierarchy is created.

Even if you do not explicitly create child views from your Handlebars templates, Ember.js internally uses the view system to update bound values. For example, every Handlebars expression `{{value}}` creates a view behind-the-scenes that knows how to update the bound value if it changes.

You can also dynamically make changes to the view hierarchy at application runtime using the `Ember.ContainerView` class. Rather than being template-driven, a container view exposes an array of child view instances that can be manually managed.

Views and templates work in tandem to provide a robust system for creating whatever user interface you dream up. End users should be isolated from the complexities of things like timing issues while rendering and event propagation. Application developers should be able to describe their UI once, as a string of Handlebars markup, and then carry on with their application without having to worry about making sure that it remains up-to-date.

## What problems does it solve?

### Child Views

In a typical client-side application, views may represent elements nested inside of each other in the DOM. In the naïve solution to this problem, separate view objects represent each DOM element, and ad-hoc references help the various view object keep track of the views conceptually nested inside of them.

Here is a simple example, representing one main app view, a collection nested inside of it, and individual items nested inside of the collection.

<img src="/images/view-guide/view-hierarchy-simple.png">

This system works well at first glance, but imagine that we want to open Joe's Lamprey Shack at 8am instead of 9am. In this situation, we will want to re-render the App View. Because the developer needed to build up the references to the children on an ad-hoc basis, this re-rendering process has several problems.

In order to re-render the App View, the App View must also manually re-render the child views and re-insert them into App View's element. If implemented perfectly, this process works well, but it relies upon a perfect, ad hoc implementation of a view hierarchy. If any single view fails to implement this precisely, the entire re-render will fail.

In order to avoid these problems, Ember's view hierarchy has the concept of child views baked in.

<img src="/images/view-guide/view-hierarchy-ember.png">

When the App View re-renders, Ember is responsible for re-rendering and inserting the child views, not application code. This also means that Ember can perform any memory management for you, such as cleaning up observers and bindings.

Not only does this eliminate quite a bit of boilerplate code, but it eliminates the possibility that an imperfectly implemented view hierarchy will cause unexpected failures.

### Event Delegation

In the past, web developers have added event listeners to individual elements in order to know when the user interacts with them. For example, you might have a `<div>` element on which you register a function that gets called when the user clicks it.

However, this approach often does not scale when dealing with large numbers of interactive elements. For example, imagine a `<ul>` with 100 `<li>`s in it, with a delete button next to each item. Since the behavior is the same for all of these items, it would be inefficient to create 100 event listeners, one for each delete button.

<img src="/images/view-guide/undelegated.png">

To solve this problem, developers discovered a technique called "event delegation". Instead of registering a listener on each element in question, you can register a single listener for the containing element and use `event.target` to identify which element the user clicked on.

<img src="/images/view-guide/delegated.png">

Implementing this is a bit tricky, because some events (like `focus`, `blur` and `change`) don't bubble. Fortunately, jQuery has solved this problem thoroughly; using jQuery's `on` method reliably works for all native browser events.

Other JavaScript frameworks tackle this problem in one of two ways. In the first approach, they ask you to implement the naïve solution yourself, creating a separate view for each element. When you create the view, it sets up an event listener on the view's element. If you had a list of 500 items, you would create 500 views and each would set up a listener on its own element.

In the second approach, the framework builds in event delegation at the view level. When creating a view, you can supply a list of events to delegate and a method to call when the event occurs. This leaves identifying the context of the click (for example, which item in the list) to the method receiving the event.

You are now faced with an uncomfortable choice: create a new view for each item and lose the benefits of event delegation, or create a single view for all of the items and have to store information about the underlying JavaScript object in the DOM.

In order to solve this problem, Ember delegates all events to the application's root element (usually the document `body`) using jQuery. When an event occurs, Ember identifies the nearest view that handles the event and invokes its event handler. This means that you can create views to hold a JavaScript context, but still get the benefit of event delegation.

Further, because Ember registers only one event for the entire Ember application, creating new views never requires setting up event listeners, making re-renders efficient and less error-prone. When a view has child views, this also means that there is no need to manually undelegate views that the re-render process replaces.

### The Rendering Pipeline

Most web applications specify their user interface using the markup of a particular templating language. For Ember.js, we've done the work to make templates written using the Handlebars templating language automatically update when the values used inside of them are changed.

While the process of displaying a template is automatic for developers, under the hood there are a series of steps that must be taken to go from the original template to the final, live DOM representation that the user sees.

This is the approximate lifecycle of an Ember view:

<img src="/images/view-guide/view-lifecycle-ember.png">

#### 1. Template Compilation

The application's templates are loaded over the network or as part of the application payload in string form. When the application loads, it sends the template string to Handlebars to be compiled into a function. Once compiled, the template function is saved, and can be used by multiple views repeatedly, each time they need to re-render.

This step may be omitted in applications where the templates are pre-compiled on the server. In those cases, the template is transferred not as the original, human-readable template string but as the compiled code.

Because Ember is responsible for template compilation, you don't have to do any additional work to ensure that compiled templates are reused.

#### 2. String Concatenation

A view's rendering process is kickstarted when the application calls `append` or `appendTo` on the view. Calling `append` or `appendTo` **schedules** the view to be rendered and inserted later. This allows any deferred logic in your application (such as binding synchronization) to happen before rendering the element.

To begin the rendering process, Ember creates a `RenderBuffer` and gives it to the view to append its contents to. During this process, a view can create and render child views. When it does so, the parent view creates and assigns a `RenderBuffer` for the child, and links it to the parent's `RenderBuffer`.

Ember flushes the binding synchronization queue before rendering each view. By syncing bindings before rendering each view, Ember guarantees that it will not render stale data it needs to replace right away.

Once the main view has finished rendering, the render process has created a tree of views (the "view hierarchy"), linked to a tree of buffers. By walking down the tree of buffers and converting them into Strings, we have a String that we can insert into the DOM.

Here is a simple example:

<img src="/images/view-guide/render-buffer.png">

In addition to children (Strings and other `RenderBuffer`s), a `RenderBuffer` also encapsulates the element's tag name, id, classes, style, and other attributes. This makes it possible for the render process to modify one of these properties (style, for example), even after its child Strings have rendered. Because many of these properties are controlled via bindings (e.g. using `bindAttr`), this makes the process robust and transparent.

#### 3. Element Creation and Insertion

At the end of the rendering process, the root view asks the `RenderBuffer` for its element. The `RenderBuffer` takes its completed string and uses jQuery to convert it into an element. The view assigns that element to its `element` property and places it into the correct place in the DOM (the location specified in `appendTo` or the application's root element if the application used `append`).

While the parent view assigns its element directly, each child views looks up its element lazily. It does this by looking for an element whose `id` matches its `elementId` property. Unless explicitly provided, the rendering process generates an `elementId` property and assigns its value to the view's `RenderBuffer`, which allows the view to find its element as needed.

#### 4. Re-Rendering

After the view inserts itself into the DOM, either Ember or the application may want to re-render the view. They can trigger a re-render by calling the `rerender` method on a view.

Rerendering will repeat steps 2 and 3 above, with two exceptions:

* Instead of inserting the element into an explicitly specified location, `rerender` replaces the existing element with the new element.
* In addition to rendering a new element, it also removes the old element and destroys its children. This allows Ember to automatically handle unregistering appropriate bindings and observers when re-rendering a view. This makes observers on a path more viable, because the process of registering and unregistering all of the nested observers automatic.

The most common cause of a view re-render is when the value bound to a Handlebars expression (`{{foo}}`) changes. Internally, Ember creates a simple view for each expression, and registers an observer on the path. When the path changes, Ember updates the area of the DOM with the new value.

Another common case is an `{{#if}}` or `{{#with}}` block. When rendering a template, Ember creates a virtual view for these block helpers. These virtual views do not appear in the publicly available view hierarchy (when getting `parentView` and `childViews` from a view), but they exist to enable consistent re-rendering.

When the path passed to an `{{#if}}` or `{{#with}}` changes, Ember automatically re-renders the virtual view, which will replace its contents, and importantly, destroy all child views to free up their memory.

In addition to these cases, the application may sometimes want to explicitly re-render a view (usually a `ContainerView`, see below). In this case, the application can call `rerender` directly, and Ember will queue up a re-rendering job, with the same semantics.

The process looks something like:

<img src="/images/view-guide/re-render.png">

## The View Hierarchy

### `parentView` and `childViews`

As Ember renders a templated view, it will generate a view hierarchy. Let's assume we have a template `form`.

```
{{view App.Search placeholder="Search"}}
{{#view Ember.Button}}Go!{{/view}}
````

And we insert it into the DOM like this:

```
var view = Ember.View.create({
  templateName: 'form'
}).append();
```

This will create a small view hierarchy that looks like this:

<img src="/images/view-guide/simple-view-hierarchy.png">

You can move around in the view hierarchy using the `parentView` and `childViews` properties.

```
var children = view.get('childViews') // [ <App.Search>, <Ember.Button> ]
children.objectAt(0).get('parentView') // view
```

One common use of the `parentView` method is inside of an instance of a child view.

```
App.Search = Ember.View.extend({
  didInsertElement: function() {
    // this.get('parentView') in here references `view`
  }
})
```

### Lifecycle Hooks

In order to make it easy to take action at different points during your view's lifecycle, there are several hooks you can implement.

* `willInsertElement`: This hook is called after the view has been rendered but before it has been inserted into the DOM. It does not provide access to the view's `element`.
* `didInsertElement`: This hook is called immediately after the view has been inserted into the DOM. It provides access to the view's `element` and is most useful for integration with an external library. Any explicit DOM setup code should be limited to this hook.
* `willDestroyElement`: This hook is called immediately before the element is removed from the DOM. This is your opportunity to tear down any external state associated with the DOM node. Like `didInsertElement`, it is most useful for integration with external libraries.
* `willRerender`: This hook is called immediately before a view is re-rendered. This is useful if you want to perform some teardown immediately before a view is re-rendered.
* `becameVisible`: This hook is called after a view's `isVisible` property, or one of its ancestor's `isVisible` property, changes to true and the associated element becomes visible. Note that this hook is only reliable if all visibility is routed through the `isVisible` property.
* `becameHidden`: This hook is called after a view's `isVisible` property, or one of its ancestor's `isVisible` property, changes to false and the associated element becomes hidden. Note that this hook is only reliable if all visibility is routed through the `isVisible` property.

Apps can implement these hooks by defining a method by the hook's name on the view. Alternatively, it is possible to register a listener for the hook on a view:

```
view.on('willRerender', function() {
  // do something with view
});
```

### Virtual Views

### Event Bubbling

## Templated views

## Programmatic views (Container views)

## Template scopes

## Template variables
