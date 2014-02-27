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

<a class="jsbin-embed" href="http://jsbin.com/witut/1/embed?output">Unit Testing Components</a>
<script src="http://static.jsbin.com/js/embed.js"></script>