## Ember.ContainerView

As you probably know by now, views usually create their child views
by using the `{{view}}` helper. However, it is sometimes useful to
_manually_ manage a view's child views.
[`Ember.ContainerView`](/api/classes/Ember.ContainerView.html)
is the way to do just that.

As you programmatically add or remove views to a `ContainerView`,
those views' rendered HTML are added or removed from the DOM to
match.

```javascript
var container = Ember.ContainerView.create();
container.append();

var firstView = App.FirstView.create(),
    secondView = App.SecondView.create();

container.pushObject(firstView);
container.pushObject(secondView);

// When the rendering completes, the DOM
// will contain a `div` for the ContainerView
// and nested inside of it, a `div` for each of
// firstView and secondView.
```

### Defining the Initial Views of a Container View

There are a few ways to specify which initial child views a
`ContainerView` should render. The most straight-forward way is to add
them in `init`:

```javascript
var container = Ember.ContainerView.create({
  init: function() {
    this._super();
    this.pushObject(App.FirstView.create());
    this.pushObject(App.SecondView.create());
  }
});

container.objectAt(0).toString(); //=> '<App.FirstView:ember123>'
container.objectAt(1).toString(); //=> '<App.SecondView:ember124>'
```

As a shorthand, you can specify a `childViews` property that will be
consulted on instantiation of the `ContainerView` also. This example is
equivalent to the one above:

```javascript
var container = Ember.ContainerView.extend({
  childViews: [App.FirstView, App.SecondView]
});

container.objectAt(0).toString(); //=> '<App.FirstView:ember123>'
container.objectAt(1).toString(); //=> '<App.SecondView:ember124>'
```

Another bit of syntactic sugar is available as an option as well:
specifying string names in the `childViews` property that correspond
to properties on the `ContainerView`. This style is less intuitive
at first but has the added bonus that each named property will
be updated to reference its instantiated child view:

```javascript
var container = Ember.ContainerView.create({
  childViews: ['firstView', 'secondView'],
  firstView: App.FirstView,
  secondView: App.SecondView
});

container.objectAt(0).toString(); //=> '<App.FirstView:ember123>'
container.objectAt(1).toString(); //=> '<App.SecondView:ember124>'

container.get('firstView').toString(); //=> '<App.FirstView:ember123>'
container.get('secondView').toString(); //=> '<App.SecondView:ember124>'
```

### It Feels Like an Array Because it _is_ an Array

You may have noticed that some of these examples use `pushObject` to add
a child view, just like you would interact with an Ember array.
[`Ember.ContainerView`](/api/classes/Ember.ContainerView.html)
gains its collection-like behavior by mixing in
[`Ember.MutableArray`](/api/classes/Ember.MutableArray.html). That means
that you can manipulate the collection of views very expressively, using
methods like `pushObject`, `popObject`, `shiftObject`, `unshiftObject`, `insertAt`,
`removeAt`, or any other method you would use to interact with an Ember array.
