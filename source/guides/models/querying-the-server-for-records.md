You can query the server by calling the store's `findQuery()` method and
passing a hash of search options. This method returns a promise that
resolves to an array of the search results.

For example, we could search for all `person` models who had the name of
`Peter`:

```js
store.findQuery('person', { name: "Peter" }).then(function(people) {
  console.log("Found " + people.get('length') + " people named Peter.");
});
```

The hash of search options that you pass to `findQuery()` is opaque to Ember
Data. By default, these options will be sent to your server as the body
of an HTTP `GET` request.

**Using this feature requires that your server knows how to interpret
query responses.**
