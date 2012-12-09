## Representing Models

Templates are always connected to controllers, not models. This ensures
that properties that are display-specific are separated from those that
are model-specific.

Often, however, it is convenient to be able to retrieve properties
directly from a model. Ember.js makes this easy with
`Ember.ObjectController` and `Ember.ArrayController`.

### Representing a Single Model

Use `Ember.ObjectController` to represent a single model. To tell an
`ObjectController` which model to represent, set its `content`
property in your route's `setupControllers` method.

When a template asks an `ObjectController` for a property, it will first
check to see if it has its own property with that name defined. If so, it will
return its current value.

However, if the controller does not have a property with that name defined, it
will return the value of the property on the model.

For example, imagine you are writing a music player. You have defined
your `SongController` to represent the currently playing song.

```javascript
App.SongController = Ember.ObjectController.extend({
  soundVolume: 1
});
```

In your router, you set the `content` of the controller to the
currently playing song:

```javascript
App.SongRoute = Ember.Route.extend({
  setupControllers: function(song) {
    this.set('controller.content', song);
  }
});
```

In your template, you want to display the name of the currently playing
song, as well as the volume at which it is playing. 

```handlebars
<p>
  <strong>Song</strong>: {{name}} by {{artist}}
</p>
<p>
  <strong>Current Volume</strong>: {{soundVolume}}
</p>
```

Because `name` and `artist` are persisted information, and thus stored
on the model, the controller looks them up there and provides them to
the template.

`soundVolume`, however, is specific to the current user's session, and
thus stored on the controller. The controller can return its own value
without consulting the model.

The advantage of this architecture is that it is easy to get started
by accessing the properties of the model via the object controller. If,
however, you need to transform a model property for a template, there is
a well-defined place to do so without adding view-specific concerns to
the model.

For example, imagine we want to display the duration of the song:

```handlebars
<p>
  <strong>Song</strong>: {{name}} by {{artist}}
</p>
<p>
  <strong>Duration</strong>: {{duration}}
</p>
```

This is saved on the server as an integer representing the number of
seconds, so our first attempt looks like this:

```html
<p>
  <strong>Song</strong>: 4 Minute Warning by Radiohead
</p>
<p>
  <strong>Duration</strong>: 257
</p>
```

Since our users are humans and not robots, however, we'd like to display
the duration as a formatted string.

This is very easy to do by defining a computed property on the
controller that transforms the model's value into a format more useful
by the template:

```javascript
App.SongController = Ember.ObjectController.extend({
  duration: function() {
    var seconds = this.get('content.duration'),
        divisorForMinutes = seconds % 3600,
        divisorForSeconds = divisorForMinutes % 60,
        minutes, seconds;

    minutes = Math.floor(divisorForMinutes / 60),
    seconds = Math.ceil(divisorForSeconds);
  
    return [minutes, seconds].join(':');
  }.property('content.duration')
});
```

Now, the output of our template is a lot friendlier:

```html
<p>
  <strong>Song</strong>: 4 Minute Warning by Radiohead
</p>
<p>
  <strong>Duration</strong>: 4:17
</p>
```
