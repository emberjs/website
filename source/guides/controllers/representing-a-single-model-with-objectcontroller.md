Use `Ember.ObjectController` to represent a single model. To tell an 
`ObjectController` which model to represent, set its `model`
property in your route's `setupController` method.

When a template asks an `ObjectController` for the value of a property, the controller 
looks for a property with the same name on itself first before checking 
the model.

For example, imagine you are writing a music player. You have defined
your `SongController` to represent the currently playing song.

```javascript
App.SongController = Ember.ObjectController.extend({
  soundVolume: 1
});
```

In the Song route, you set the `model` of the controller to the
currently playing song:

```javascript
App.SongRoute = Ember.Route.extend({
  setupController: function(controller, song) {
    controller.set('model', song);
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
controller which transforms the model's value into a human-readable
format for the template:

```javascript
App.SongController = Ember.ObjectController.extend({
  duration: function() {
    var duration = this.get('model.duration'),
         minutes = Math.floor(duration / 60),
         seconds = duration % 60;

    return [minutes, seconds].join(':');
  }.property('model.duration')
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
