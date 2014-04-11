Components can be testing using the `moduleForComponent` helper. Here is a 
simple Ember component:

```javascript
App.PrettyColorComponent = Ember.Component.extend({
  classNames: ['pretty-color'],
  attributeBindings: ['style'],
  style: function() {
    return 'color: ' + this.get('name') + ';';
  }.property('name')
});
```

with an accompanying Handlebars template:

```handlebars
Pretty Color: {{name}}
```

Unit testing this component can be done using the `moduleForComponent` helper.
This helper will find the component by name (pretty-color) and it's template (if
available).

```javascript
moduleForComponent('pretty-color');
```

Now each of our tests has a function `subject()` which aliases the create
method on the component factory.

Here's how we would test to make sure rendered HTML changes when changing the
color on the component:

```javascript
test('changing colors', function(){

  // this.subject() is available because we used moduleForComponent
  var component = this.subject();

  // we wrap this with Ember.run because it is an async function
  Ember.run(function(){
    component.set('name','red');
  });

  // first call to $() renders the component.
  equal(this.$().attr('style'), 'color: red;');

  // another async function, so we need to wrap it with Ember.run
  Ember.run(function(){
    component.set('name', 'green');
  });

  equal(this.$().attr('style'), 'color: green;');
});
```

Another test that we might perform on this component would be to ensure the
template is being rendered properly.

```javascript
test('template is rendered with the color name', function(){
  
  // this.subject() is available because we used moduleForComponent
  var component = this.subject();

  // first call to $() renders the component.
  equal($.trim(this.$().text()), 'Pretty Color:');

  // we wrap this with Ember.run because it is an async function
  Ember.run(function(){
    component.set('name', 'green');
  });

  equal($.trim(this.$().text()), 'Pretty Color: green');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/witut/8/embed?output">Unit Testing 
Components</a>

### Interacting with Components in the DOM

Ember Components are a great way to create powerful, interactive, self-contained 
custom HTML elements. Because of this, it is important to not only test the 
methods on the component itself, but also the user's interaction with the
component.

Let's look at a very simple component which does nothing more than set it's own
title when clicked:

```javascript
App.MyFooComponent = Em.Component.extend({
  title:'Hello World',
  
  actions:{
    updateTitle: function(){
      this.set('title', 'Hello Ember World');
    }
  }
});
```

We would use [Integration Test Helpers] to interact with the rendered component:

```javascript
moduleForComponent('my-foo', 'MyFooComponent');

test('clicking link updates the title', function() {
  var component = this.subject();
  
  // append the component to the DOM
  this.append();
  
  // assert default state
  equal(find('h2').text(), 'Hello World');
  
  // perform click action
  click('button');
  
  andThen(function() { // wait for async helpers to complete
    equal(find('h2').text(), 'Hello Ember World');
  });
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/49/embed?output">Unit 
Testing Components</a>

### Components with built in layout

Some components do not use a separate template. The template can be embedded
into the component via the [layout] property. For example:

```javascript
App.MyFooComponent = Ember.Component.extend({

  // layout supercedes template when rendered
  layout: Ember.Handlebars.compile(
    "I'm a little {{noun}}<br/>" +
    "<button {{action 'clickFoo'}}>Click Me</button>"
  ),

  noun: 'teapot',

  actions:{
    changeName: function(){
      this.set('noun', 'embereño');
    }
  }
});
```

In this example, we would still perform our test by interacting with the DOM.

```javascript
moduleForComponent('my-foo', 'MyFooComponent');

test('clicking link updates the title', function() {
  var component = this.subject();
  
  // append the component to the DOM
  this.append();
  
  // assert default state
  equal(find('h2').text(), "I'm a little teapot");
  
  // perform click action
  click('button');
  
  andThen(function() { // wait for async helpers to complete
    equal(find('h2').text(), "I'm a little embereño");
  });
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/51/embed?output">Testing 
Components with Built-in Layout</a>

### Programmatically interacting with components

Another way we can test our components is to perform function calls directly
on the component instead of through DOM interaction. Let's use the same code
example we have above as our component, but perform the tests programatically:

```javascript
moduleForComponent('my-foo', 'MyFooComponent');

test('clicking link updates the title', function() {
  var component = this.subject();
  
  // append the component to the DOM, returns DOM instance
  var $component = this.append();
  
  // assert default state
  equal($component.find('h2').text(), "I'm a little teapot");
  
  // send action programmatically
  Em.run(function(){
    component.send('changeName');
  });
  
  equal($component.find('h2').text(), "I'm a little embereño");
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/ladup/2/embed?output">Programatically 
Testing Components</a>

### `sendAction` validation in components

Components often utilize `sendAction`, which is a way to interact with the Ember
application. Here's a simple component which sends the action `internalAction`
when a button is clicked:

```javascript
App.MyFooComponent = Ember.Component.extend({
  layout:Ember.Handlebars.compile("<button {{action 'doSomething'}}></button>"),

  actions:{
    doSomething: function(){
      this.sendAction('internalAction');
    }
  }
});
```

In our test, we will create a dummy object that receives the action being sent
by the component.

```javascript
moduleForComponent('my-foo', 'MyFooComponent');

test('trigger external action when button is clicked', function() {
  // tell our test to expect 1 assertion
  expect(1);
  
  // component instance
  var component = this.subject();
  
  // component dom instance
  var $component = this.append();
  
  var targetObject = {
    externalAction: function(){
      // we have the assertion here which will be
      // called when the action is triggered
      ok(true, 'external Action was called!');
    }
  }; 
  
  // setup a fake external action to be called when 
  // button is clicked
  component.set('internalAction', 'externalAction');
  
  // set the targetObject to our dummy object (this
  // is where sendAction will send it's action to)
  component.set('targetObject', targetObject);
  
  // click the button
  click('button');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/nabah/2/embed?output">sendAction 
Validation in Components</a>

<script src="http://static.jsbin.com/js/embed.js"></script>

[Integration Test Helpers]: /guides/testing/test-helpers
[layout]: http://emberjs.com/api/classes/Ember.Component.html#property_layout
