## Problem
You'd like to redraw your views every few seconds/minutes e.g. to update
relative timestamps (like on twitter.com).

## Solution
Have a clock object with a `pulse` attribute in your application which 
increments using a timed interval. You want to let view(s) bind values to be
refreshed when the `pulse` attribute increments.

The clock object can be used to create new instances for binding to new views
generated within the application, like a list of comments.

## Discussion

<a class="jsbin-embed" href="http://jsbin.com/iLETUTI/10/embed?output">
Cookbook: Continuous Redrawing of Views
</a><script src="http://static.jsbin.com/js/embed.js"></script>

### ClockService object

This `ClockService` is an example of an object that may come from a library.
And, is injected into the application via an initializer.

During initialization the `tick` method is called which uses `Ember.run.later`
with a time of 250 milliseconds as the interval. A property is set at the end
of the interval. Since the `tick` method observes the incremented property
another interval is triggered each time the property increases.

```javascript
var ClockService = Ember.Object.extend({
  pulse: Ember.computed.oneWay('_seconds').readOnly(),
  tick: function () {
    var clock = this;
    Ember.run.later(function () {
      var seconds = clock.get('_seconds');
      if (typeof seconds === 'number') {
        clock.set('_seconds', seconds + (1/4));
      }
    }, 250);
  }.observes('_seconds').on('init'),
  _seconds: 0,
});
```

### Binding to the `pulse` attribute

In this recipe, an application initializer is used to inject an instance of the
`ClockService` object, setting a controller's `clock` property to this instance.

```javascript
Ember.Application.initializer({
  name: 'clockServiceInitializer',
  initialize: function(container, application) {
    container.register('clock:service', ClockService);
    application.inject('controller:interval', 'clock', 'clock:service');
  }
});
```

The controller can set any computed properties based on the `pulse` property of
the injected `clock` instance.

In this case the `seconds` property is bound to the `pulse` property of the
controller's `clock`. The property `clock.pulse` was injected during
initialization.

The controller has (session) data to display `seconds` to visitors, as well as
a handful of properties used as conditions in the Handlebars template.

```javascript
App.IntervalController = Ember.ObjectController.extend({
  secondsBinding: 'clock.pulse',
  fullSecond: function () {
    return (this.get('seconds') % 1 === 0);
  }.property('seconds'),
  quarterSecond: function () {
    return (this.get('seconds') % 1 === 1/4);
  }.property('seconds'),
  halfSecond: function () {
    return (this.get('seconds') % 1 === 1/2);
  }.property('seconds'),
  threeQuarterSecond: function () {
    return (this.get('seconds') % 1 === 3/4);
  }.property('seconds')
});
```

A controller for a list of comments, which creates a new clock instance
for each comment. Each comment in the list also has a controller. When a
comment is created the `init` method adds a clock instance to the comment.

```javascript
App.CommentItemController = Ember.ObjectController.extend({
  init: function() {
    this.set('clock', ClockService.create());
  }
})

App.CommentsController = Ember.ArrayController.extend({
  needs: ['interval'],
  clockBinding: 'controllers.interval.clock',
  itemController: 'commentItem',
  actions: {
    add: function () {
      this.addObject(Em.Object.create({
        comment: $('#comment').val()
      }));
    }
  }
});
```

### Handlebars template which displays the `pulse`

The `seconds` value is computed from the `pulse` attribute. And the controller
has a few properties to select a component to render, `fullSecond`,
`quarterSecond`, `halfSecond`, `threeQuarterSecond`.

```handlebars
{{#if fullSecond}}
  {{nyan-start}}
{{/if}}
{{#if quarterSecond}}
  {{nyan-middle}}
{{/if}}
{{#if halfSecond}}
  {{nyan-end}}
{{/if}}
{{#if threeQuarterSecond}}
  {{nyan-middle}}
{{/if}}
<h3>You&apos;ve nyaned for {{digital_clock seconds}} (h:m:s)</h3>
{{render comments}}
```

A template for a list of comments

```handlebars
<input type="text" id="comment" />
<button {{action 'add'}}>Add Comment</button>
<ul>
  {{#each}}
    <li>{{comment}} ({{digital_clock clock.pulse}})</li>
  {{/each}}
</ul>
```

### Handlebars helper to format the clock display (h:m:s)

This helper is used in the template like so `{{digital_clock seconds}}`,
`seconds` is the property of the controller that will be displayed (h:m:s).

```javascript
Ember.Handlebars.registerBoundHelper('digital_clock', function(seconds) {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var addZero = function (number) {
    return (number < 10) ? '0' + number : '' + number;
  };
  var formatHMS = function(h, m, s) {
    if (h > 0) {
      return '%@:%@:%@'.fmt(h, addZero(m), addZero(s));
    }
    return '%@:%@'.fmt(m, addZero(s));
  };
  return new Ember.Handlebars.SafeString(formatHMS(h, m, s));
});
```

### Note

To explore the concept further, try adding a timestamp and updating the clock's
pulse by comparing the current time. This would be needed to update the pulse
property when a user puts his/her computer to sleep then reopens their browser
after waking.

### Links

The source code:

* <http://jsbin.com/iLETUTI/8/>

Further reading:

* <http://emberjs.com/api/classes/Ember.Object.html>
* <http://emberjs.com/api/classes/Ember.Application.html>, See section on
  "Initializers"
* <http://emberjs.com/api/classes/Ember.Application.html#method_inject>
* <http://emberjs.com/guides/templates/conditionals/>
* <http://emberjs.com/guides/templates/writing-helpers/>
* <http://emberjs.com/guides/components/defining-a-component/>
* <http://emberjs.com/api/classes/Ember.ArrayController.html>
