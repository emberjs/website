## Problem
You'd like to redraw your views every few seconds/minutes. For example, to update relative timestamps (like on twitter.com).

## Solution
Periodically call `notifyPropertyChange` on the property you want to redraw.

```javascript
App.TimeOnPage = Ember.View.extend({
  template: Ember.Handlebars.compile('{{view.secondsViewed}}'),

  setStart: function() {
    this.initialSeconds = (new Date()).getTime();
  }.on('init'),
  
  scheduleTimer: function() {
    setInterval(function() {
      Ember.run(this, function() {
        this.notifyPropertyChange('secondsViewed');
      })
    }.bind(this), 100);
  }.on('didInsertElement'),
  
  secondsViewed: function() {
    var nowSeconds = (new Date()).getTime();
    return (nowSeconds - this.initialSeconds)/1000;
  }.property()
});
```

## Discussion
Calling `notifyPropertyChange` on a property notifies observers that the property has potentially changed value. If it did change value, the view will be redrawed. Wrapping the `notifyPropertyChange` call inside an `Ember.run`, ensures periodic calls are scheduled instead of being called at arbitrary times, thus avoiding performance issues.

We can improve the reusability of the code with a Handlebars helper:

```javascript
Ember.Handlebars.registerHelper('refresh', function(property, options) {
  var every = options.hash.every || 1000;
  
  setInterval(function() {
    Ember.run(this, function() {
      this.notifyPropertyChange(property);
    });
  }.bind(this), every);
  
  return Ember.Handlebars.helpers.bind.call(this, property, options);
});
```

```handlebars
{{refresh someProperty every=1000}}
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/umOnUVi/1/edit?html,js,output">JS Bin</a>
