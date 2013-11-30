## Problem

You want to display dates in relative form.

## Solution

[Moment.js](http://momentjs.com) will be used for formatting the dates.

Start by creating a new view, which would just render the result of
`moment().fromNow()` and register a helper for it.

```javascript
App.FromNowView = Ember.View.extend({
  tagName: 'time',
  template: Ember.Handlebars.compile('{{view.fromNow}}'),
  
  fromNow: function() {
    return moment(this.get('value')).fromNow();
  }.property('value')
});

Ember.Handlebars.helper('fromNow', App.FromNowView);
```

Relative dates, however, need to be updated periodically, so we'll
trigger a view re-render every second.

```javascript
App.FromNowView = Ember.View.extend({
  // ...
  nextTick: null,
  
  didInsertElement: function() {
    this.tick();
  },
  
  tick: function() {
    var nextTick = Ember.run.later(this, function() {
      this.notifyPropertyChange('value');
      this.tick();
    }, 1000);
    this.set('nextTick', nextTick);
  },
  
  willDestroyElement: function() {
    Ember.run.cancel(this.get('nextTick'));
  }
});
```

Now the template can be like this:

```html
created {{fromNow value=createdAt}}
```

## Discussion

#### Example

<a class="jsbin-embed" href="http://jsbin.com/uLETuPe/1/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
