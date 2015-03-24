## Problem
You would like to display different templates based on a property of your model.
For example your model might have a `type` property which determines how you would
like to display it.

## Solution
Create an extension to the Ember.ContainerView, with a binding to an object property
which determines the template to be displayed.
If the property changes, the app will automatically show the appropriate template.

Lets say you're building an application that showcases different types of cars.
First lets define a model to represent the cars. Each car has a name and a type.
We'll also define a controller for this model which has a computed property for
determining the name of the template to be shown based on the car type.


```js
App.Car = Ember.Object.extend({
  name: null,
  type: null
});

App.CarController = Ember.ObjectController.extend({
  types: ['flashy', 'regular'],
  presentationTemplateName: function() {
    return 'presentation/'+this.get('type');
  }.property('type')
});
```

Assuming that we have a controller which has an array of cars as its model,
we are going to iterate over the cars, displaying each cars name together with a
select list where the user can change the car type.
Lastly we'll include a dynamic view for each car which will display a template based
on the cars type. Note that the dynamic view has its template name bound to the
`presentationTemplateName` property of the controller. We will use `App.CarController`
as the itemController when we loop over the set of cars in order to give us access to
the `presentationTemplateName` computed property on the controller.

```hbs
{{#each car in model itemController='car'}}
  {{car.name}}<br>
  {{view Ember.Select
    content=types
    value=car.type}}
  {{dynamic-view templateName=presentationTemplateName}}
  <hr>
{{/each}}
```

The EmberContainerView consists of array of views which can be manipulated at runtime.
We will define a DynamicView which extends this behaviour to display a single view
showing the template identified by the `templateName` property. Every time the property
changes its value the updateViewDynamically function removes the last entry from the
array of views, before creating a new view and adding it to the array of views.
The templateName property needs to be bound when we insert the dynamic view,
as illustrated above.

```js
App.DynamicView = Ember.ContainerView.extend({
  updateViewDynamically: function() {
    this.popObject();
    var childView = this.createChildView(Ember.View.create({
      templateName: this.get('templateName')
    }));
    this.pushObject(childView);
  }.observes('templateName').on('init')
});
```

Lastly we register the dynamic view as an ember helper so that we can insert it into
our templates using `{{dynamic-view}}` instead of `{{view App.DynamicView}}`

```js
Ember.Handlebars.helper('dynamic-view', App.DynamicView);
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/dowimihu/3/embed?live,js">JS Bin</a>
<script src="http://static.jsbin.com/js/embed.js"></script>


## Discussion