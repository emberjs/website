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

<a class="jsbin-embed" href="http://jsbin.com/somosocuni/1/embed?output">
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

A controller for a list of comments, each comment will have a new clock
instance when added to the list. The comment item controller sets up
the `seconds` binding, used by the template to show the time since the
comment was created.

```javascript
App.CommentItemController = Ember.ObjectController.extend({
  seconds: Ember.computed.oneWay('clock.pulse').readOnly()
});

App.CommentsController = Ember.ArrayController.extend({
  itemController: 'commentItem',
  comment: null,
  actions: {
    add: function () {
      this.addObject(Em.Object.create({
        comment: this.get('comment'),
        clock: ClockService.create()
      }));
      this.set('comment', null);
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
<h3>You&apos;ve nyaned for {{digital-clock seconds}} (h:m:s)</h3>
{{render 'comments'}}
```

A template for a list of comments

```handlebars
<form {{action "add" on="submit"}}>
  {{input value=comment}}
  <button>Add Comment</button>
</form>
<ul>
{{#each item in this}}
  <li>{{item.comment}} ({{digital-clock item.seconds}})</li>
{{/each}}
</ul>
```

### Handlebars helper to format the clock display (h:m:s)

This helper is used in the template like so `{{digital-clock seconds}}`,
`seconds` is the property of the controller that will be displayed (h:m:s).

```javascript
Ember.Handlebars.registerBoundHelper('digital-clock', function(seconds) {
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

* <http://jsbin.com/somosocuni/1/edit?html,js,output>

Further reading:

* [Ember Object](/api/classes/Ember.Object.html)
* [Ember Application Initializers](/api/classes/Ember.Application.html#toc_initializers)
* [Method Inject](/api/classes/Ember.Application.html#method_inject)
* [Conditionals](/guides/templates/conditionals/)
* [Writing Helpers](/guides/templates/writing-helpers/)
* [Defining a Component](/guides/components/defining-a-component/)
* [Ember Array Controller](/api/classes/Ember.ArrayController.html)
