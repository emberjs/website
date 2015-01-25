_Unit testing methods and computed properties follows previous patterns shown 
in [Unit Testing Basics] because Ember.Component extends Ember.Object._

#### Setup

Before testing components, be sure to add the testing application div to your testing html file:

```html
<!-- as of time writing, ID attribute needs to be named exactly ember-testing -->
<div id="ember-testing"></div>
```

You'll also need to tell Ember to use this element for rendering the application:

```javascript
App.rootElement = '#ember-testing'
```

You can test components using the `moduleForComponent` helper. Testing this 
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

... with an accompanying Handlebars template:

```handlebars
Pretty Color: {{name}}
```

Unit testing this component can be done using the `moduleForComponent` helper.
This helper will find the component by name (pretty-color) and its template (if
available).

```javascript
moduleForComponent('pretty-color');
```

Now each test following the `moduleForComponent` call has a `subject()` function,
which aliases the create method on the component factory.

We can test to make sure that changing the component's color property updates
the rendered HTML:

```javascript
test('changing colors', function() {

  // this.subject() is available because we used moduleForComponent
  var component = this.subject();

  // we wrap this with Ember.run because it is an async function
  Ember.run(function() {
    component.set('name','red');
  });

  // first call to $() renders the component.
  equal(this.$().attr('style'), 'color: red;');

  // another async function, so we need to wrap it with Ember.run
  Ember.run(function() {
    component.set('name', 'green');
  });

  equal(this.$().attr('style'), 'color: green;');
});
```

We might also test this component to ensure the template is being 
rendered properly.

```javascript
test('template is rendered with the color name', function() {
  
  // this.subject() is available because we used moduleForComponent
  var component = this.subject();

  // first call to $() renders the component.
  equal($.trim(this.$().text()), 'Pretty Color:');

  // we wrap this with Ember.run because it is an async function
  Ember.run(function() {
    component.set('name', 'green');
  });

  equal($.trim(this.$().text()), 'Pretty Color: green');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/xagowicabu/1/embed?output">Unit Testing
Components</a>

### Interacting with Components in the DOM

Ember Components are a great way to create powerful, interactive, self-contained 
custom HTML elements. Because of this, it is important to test the 
component's methods _and_ the user's interaction with the component.

Let's look at a very simple component that simply sets its own
title when clicked:

```javascript
App.MyFooComponent = Em.Component.extend({
  title:'Hello World',
  
  actions: {
    updateTitle: function() {
      this.set('title', 'Hello Ember World');
    }
  }
});
```

We would use [Integration Test Helpers] to interact with the rendered component
and test its behavior:

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

<a class="jsbin-embed" href="http://jsbin.com/kolumurite/1/embed?output">Unit
Testing Components</a>

### Components with embedded layout

Some components do not use a separate template. Instead, the template is embedded
into the component via the [layout] property and inline HTML. For example:

```javascript
App.MyFooComponent = Ember.Component.extend({

  // layout supercedes template when rendered
  layout: Ember.Handlebars.compile(
    "<h2>I'm a little {{noun}}</h2><br/>" +
    "<button {{action 'changeName'}}>Click Me</button>"
  ),

  noun: 'teapot',

  actions: {
    changeName: function() {
      this.set('noun', 'embereño');
    }
  }
});
```

In this example, we would still use [Integration Test Helpers] to
test a user's DOM interaction.

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

<a class="jsbin-embed" href="http://jsbin.com/kexeladayo/1/embed?output">Testing
Components with Built-in Layout</a>

### Programmatically interacting with components

Another way we can test our components is to perform function calls directly
on the component instead of through DOM interaction. Let's use the same component
example from above, but perform the tests programatically:

```javascript
moduleForComponent('my-foo', 'MyFooComponent');

test('sending changeName message updates the title', function() {
  var component = this.subject();
  
  // append the component to the DOM, returns DOM instance
  var $component = this.append();
  
  // assert default state
  equal($component.find('h2').text(), "I'm a little teapot");
  
  // send action programmatically
  Ember.run(function() {
    component.send('changeName');
  });
  
  equal($component.find('h2').text(), "I'm a little embereño");
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/kuwanafale/1/embed?output">Programatically
Testing Components</a>

### `sendAction` validation in components

Components often utilize `sendAction`, which is a way to interact with the Ember
application. Here's a simple component that sends the action `internalAction`
when a button is clicked:

```javascript
App.MyFooComponent = Ember.Component.extend({
  layout:Ember.Handlebars.compile("<button {{action 'doSomething'}}></button>"),

  actions: {
    doSomething: function() {
      this.sendAction('internalAction');
    }
  }
});
```

In our test, we will create a test double (dummy object) that receives 
the action being sent by the component.

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
    externalAction: function() {
      // we have the assertion here which will be
      // called when the action is triggered
      ok(true, 'external Action was called!');
    }
  }; 
  
  // setup a fake external action to be called when 
  // button is clicked
  component.set('internalAction', 'externalAction');
  
  // set the targetObject to our dummy object (this
  // is where sendAction will send its action to)
  component.set('targetObject', targetObject);
  
  // click the button
  click('button');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/fulibifore/1/embed?output">sendAction
Validation in Components</a>

### Components Using Other Components

Sometimes components are easier to maintain if they're broken up into parent and child
components. Here is a simple example:

```javascript
App.MyAlbumComponent = Ember.Component.extend({
  tagName: 'section',
  layout: Ember.Handlebars.compile(
      "<section>" +
      "  <h3>{{title}}</h3>" +
      "  {{yield}}" +
      "</section>"
  ),
  titleBinding: ['title']
});

App.MyKittenComponent = Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src'],
  src: function() {
    return 'http://placekitten.com/' + this.get('width') + '/' + this.get('height');
  }.property('width', 'height')
});
```

Usage of this component might look something like this:

```handlebars
{{#my-album title="Cats"}}
  {{my-kitten width="200" height="300"}}
  {{my-kitten width="100" height="100"}}
  {{my-kitten width="50" height="50"}}
{{/my-album}}
```

Using the `needs` callback greatly simplifies testing components 
with a parent-child relationship.

```javascript
moduleForComponent('my-album', 'MyAlbumComponent', {
  needs: ['component:my-kitten']
});

test('renders kittens', function() {
  expect(2);
  
  // component instance
  var component = this.subject({
    title: 'Cats',
    template: Ember.Handlebars.compile(
      '{{my-kitten width="200" height="300"}}' +
      '{{my-kitten width="100" height="100"}}' +
      '{{my-kitten width="50" height="50"}}'
    )
  });
  
  // append component to the dom
  var $component = this.append();
  
  // perform assertions
  equal($component.find('h3:contains("Cats")').length, 1);
  equal($component.find('img').length, 3);
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/jirizimeru/1/embed?output">Components
with Embedded Components</a>

<script src="http://static.jsbin.com/js/embed.js"></script>

[Unit Testing Basics]: /guides/testing/unit-testing-basics
[Integration Test Helpers]: /guides/testing/test-helpers
[layout]: /api/classes/Ember.Component.html#property_layout
