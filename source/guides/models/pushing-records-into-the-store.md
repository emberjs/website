One way to think about the store is as a cache of all of the records
that have been loaded by your application. If a route or a controller in
your app asks for a record, the store can return it immediately if it is
in the cache. Otherwise, the store must ask the adapter to load it,
which usually means a trip over the network to retrieve it from the
server.

Instead of waiting for the app to request a record, however, you can
push records into the store's cache ahead of time.

This is useful if you have a good sense of what records the user
will need next. When they click on a link, instead of waiting for a
network request to finish, Ember.js can render the new template
immediately. It feels instantaneous.

Another use case for pushing in records is if your application has a
streaming connection to a backend. If a record is created or modified,
you want to update the UI immediately.

### Pushing Records

To push a record into the store, call the store's `push()` method.

For example, imagine we want to preload some data into the store when
the application boots for the first time.

We can use the `ApplicationRoute` to do so. The `ApplicationRoute` is
the top-most route in the route hierarchy, and its `model` hook gets
called once when the app starts up.

```js
var attr = DS.attr;

App.Album = DS.Model.extend({
  title: attr(),
  artist: attr(),
  songCount: attr()
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    this.store.push('album', {
      id: 1,
      title: "Fewer Moving Parts",
      artist: "David Bazan",
      songCount: 10
    });

    this.store.push('album', {
      id: 2,
      title: "Calgary b/w I Can't Make You Love Me/Nick Of Time",
      artist: "Bon Iver",
      songCount: 2
    });
  }
});
```
