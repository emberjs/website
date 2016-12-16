Currently, our app is using hard-coded data for _rentals_ in the `rentals` route handler to set the model.
As our application grows, we will want to be able to create new rentals,
make updates to them, delete them, and save these changes to a backend server.
Ember integrates with a data management library called Ember Data to help solve this problem.

Let's generate our first Ember Data model called `rental`:

```shell
ember g model rental
```

This results in the creation of a model file and a test file:

```shell
installing model
  create app/models/rental.js
installing model-test
  create tests/unit/models/rental-test.js
```

When we open the model file, we see:

```app/models/rental.js
import DS from 'ember-data';

export default DS.Model.extend({

});
```

Let's add the same attributes for our rental that we used in our hard-coded array of JavaScript objects -
_title_, _owner_, _city_, _type_, _image_, _bedrooms_ and _description_:

```app/models/rental.js
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  owner: DS.attr(),
  city: DS.attr(),
  type: DS.attr(),
  image: DS.attr(),
  bedrooms: DS.attr(),
  description: DS.attr()
});
```

Now we have a model in our Ember Data store.

### Updating the Model Hook

To use our new data store, we need to update the `model` hook in our route handler.

```app/routes/rentals.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('rental');
  }
});
```

When we call `this.get('store').findAll('rental')`, Ember Data will make a GET request to `/rentals`.
You can read more about Ember Data in the [Models section](../../models/).

Since we're using Mirage in our development environment, Mirage will return the data we've provided.
When we deploy our app to a production server, we will need to provide a backend for Ember Data to communicate with.
