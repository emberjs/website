## Representing Multiple Models

You can use `Ember.ArrayController` to represent an array of models. To tell an
`ArrayController` which model to represent, set its `content` property
in your route's `setupController` method.

You can treat an `ArrayController` just like its underlying array. For
example, imagine we want to display the current playlist. In our router,
we setup our `SongsController` to represent the songs in the playlist:

```javascript
App.SongsRoute = Ember.Route.extend({
  setupController: function(controller, playlist) {
    controller.set('content', playlist.get('songs'));
  }
});
```

In the `songs` template, we can use the `{{#each}}` helper to display
each song:

```handlebars
<h1>Playlist</h1>

<ul>
  {{#each controller}}
    <li>{{name}} by {{artist}}</li>
  {{/each}}
</ul>
```

You can use the `ArrayController` to collect aggregate information about
the models it represents. For example, imagine we want to display the
number of songs that are over 30 seconds long. We can add a new computed
property called `longSongCount` to the controller:

```javascript
App.SongsController = Ember.ArrayController.extend({
  longSongCount: function() {
    var longSongs = this.filter(function(song) {
      return song.get('duration') > 30;
    });
    return longSongs.get('length');
  }.property('@each.duration')
});
```

Now we can use this property in our template:

```handlebars
<ul>
  {{#each controller}}
    <li>{{name}} by {{artist}}</li>
  {{/each}}
</ul>

{{longSongCount}} songs over 30 seconds.
```
