Components can be testing using the `moduleForComponent` helper. Here is a simple Ember component:

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

Unit testing this component can be done as follows:

```javascript
moduleForComponent('pretty-color', 'moduleForComponent with pretty-color');

test('changing colors', function(){
  var component = this.subject();

  Ember.run(function(){
    component.set('name','red');
  });

  // first call to $() renders the component.
  equal(this.$().attr('style'), 'color: red;');

  Ember.run(function(){
    component.set('name', 'green');
  });

  equal(this.$().attr('style'), 'color: green;');
});

test('className', function(){
  // first call to this.$() renders the component.
  ok(this.$().is('.pretty-color'));
});

test("template", function(){
  var component = this.subject();

  equal($.trim(this.$().text()), 'Pretty Color:');

  Ember.run(function(){
    component.set('name', 'green');
  });

  equal($.trim(this.$().text()), 'Pretty Color: green');
});
```

#### Example

<script src="http://static.jsbin.com/js/embed.js"></script>

<a class="jsbin-embed" href="http://jsbin.com/witut/1/embed?js,output">Unit Testing Components</a>


###Interacting with components in the dom

In this example we are 

    1. creating an instance of the component
    2. inserting it into the dom
    3. clicking a button in the component
    4. validating the expected effects from the click have occurred

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/37/embed?js,output">Unit Testing Components</a>

###Components with built in layout

In this example we are 

    1. creating an instance of the component that has no associated template
    2. inserting it into the dom
    3. validating the tagName
    4. validating the text in the component
    5. clicking a button in the component
    6. validating the text in the component

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/41/embed?js,output">Unit Testing Components</a>

###Programmatically interacting with components

In this example we are 

    1. creating an instance of the component that has no associated template
    2. inserting it into the dom
    3. programmatically calling an action 
    4. validating the text in the component

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/40/embed?js,output">Unit Testing Components</a>

###sendAction validation in components


In this example we are 

    1. creating an instance of the component that has no associated template
    2. creating a dummy object to receive the `action` from `sendAction`
    3. hooking up `internalAction` to call `externalAction` 
    4. setting the targetObject to our dummy object (this is where sendAction will send it's action to)
    5. inserting the component into the dom
    6. clicking the button
    7. validating the action was sent
<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/38/embed?js,output">Unit Testing Components</a>
