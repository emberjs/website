### Problem

You want to display or update something that changes based on the passing of
time. Relative timestamps, like those used on twitter.com, and session
expiry are a great examples of such a need.

### Solution

Implement a computed property macro that uses a timer to automatically update
itself at a specified interval:

```javascript
void function() {

/**
  Creates a computed property that automatically updates itself to the current
  time at the specified interval in milliseconds. Useful when used as a
  dependent property to properties that need to changed based on the passing of
  time.

  App.PostController = Ember.ObjectController.extend({
    now: Ember.computed.timer(1000),

    sinceCreated: function() {
      return this.get('now').getTime() - this.get('createdAt').getTime();
    }.property('createdAt', 'now')
  });
*/

var DEFAULT_INTERVAL = 1000, // 1 second
    later  = Ember.run.later,
    cancel = Ember.run.cancel;

function Timer(interval) {
  this.interval = (interval || DEFAULT_INTERVAL);
}

Timer.prototype = {
  didTick: Em.K,
  isActive: false,
  currentInterval: 0,

  resume: function() {
    if (!this.isActive) {
      this.isActive = true;
      this._tick();
    }
  },

  cancel: function() {
    if (this.isActive) {
      cancel(this._nextTick);
      this.isActive = false;
    }
  },

  _tick: function() {
    this._nextTick = later(this, function() {
      this._tick();
      this.currentInterval++;
      this.didTick(this.currentInterval);
    }, this.interval);
  }
};

Ember.computed.timer = function(interval) {
  var timer = new Timer(interval);

  return Ember.computed(function(key) {
    var obj = this;
    timer.didTick = function() {
      obj.notifyPropertyChange(key);
    };
    timer.resume();
    return new Date();
  }).readOnly();
};

}.call(this);
```

We can now use our computed property macro along with Moment.js to create a
`reltime` Handlebars helper:

```javascript
/**
  Outputs an automatically-updating relative timestamp:

  <p>
    Created {{reltime time=createdAt}}.
  </p>
*/

Ember.Handlebars.helper('reltime', Ember.View.extend({
  tagName:  'time',
  template: Ember.Handlebars.compile('{{view.caption}}'),
  now:      Ember.computed.timer(1000),

  caption: Ember.computed(function() {
    var time = this.get('time'),
        now  = this.get('now');

    if (!time) {
      return '';
    }

    return moment(time).from(now);
  }).property('time', 'now')
}));
```

### Discussion

This is just one example of a timer implementation for use in an Ember
application. A possible alternative implementation might not use a computed
property macro, but instead implement an `ApplicationTimerController` that,
when initialized, would set up a timer to autmatically increment its `tick`
property, other controllers in the application would
`needs: 'applicationTimer'` and depend on its `tick` property.

Properties that need to be updated with less frequency should have longer
intervals. For example, suppose you have a grid of store hours and you want to
highlight the current day and show if the store is open, this would not need to
be updated every second, perhaps every minute would make more sense.

Finally, it's important to understand that computed properties are never
actually computed unless they are accessed, even when specified as a dependency.
Consider the following example, `timeSinceCreated` will never automatically
update since it's never acessed and never computed:

```javascript
App.PostController = Ember.Controller.extend({
  timer: Ember.computed.timer(),

  timeSinceCreated: function() {
    return moment(this.get('createdAt')).fromNow();
  }.property('createdAt', 'timer')
});
```

However, with this implementation, `timer` is accessed from `timeSinceCreated`,
this causes Ember to evalute the `timer` computed property and starts the timer
and begins the process of automatically updating itself.

```javascript
App.PostController = Ember.Controller.extend({
  timer: Ember.computed.timer(),

  timeSinceCreated: function() {
    this.get('timer');
    return moment(this.get('createdAt')).fromNow();
  }.property('createdAt', 'timer')
});
```

### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/ExUyaNi/16/embed?output">Timers in Ember Example</a><script src="http://static.jsbin.com/js/embed.js"></script>
