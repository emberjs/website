As they search for a rental, users might also want to narrow their search to a specific city.
Let's build a component that will let them filter rentals by city.

To begin, let's generate our new component.
We'll call this component `list-filter`, since all we want our component to do is filter the list of rentals based on input.

```shell
ember g component list-filter
```

As before, this creates a Handlebars template (`app/templates/components/list-filter.hbs`),
a JavaScript file (`app/components/list-filter.js`),
and a component integration test (`tests/integration/components/list-filter-test.js`).

Let's start with writing some tests to help us think through what we are doing.
The filter component should yield a list of filtered items to whatever is rendered inside of it, known as its inner template block.
We want our component to call out to two actions: one action to provide a list of all items when no filter is provided, and the other action to search listings by city.

For our initial test, we will check that all the cities we provide are rendered and that the listing object is accessible from the template.

Our action call to filter by city will be made asynchronously and we will have to accommodate for this in our test.
We will leverage [actions](../../components/triggering-changes-with-actions/#toc_handling-action-completion) here to handle asynchronous action completion from our `filterByCity` call by returning a promise from our stubbed action.

Note that we also need to add a `wait` call at the end of our test to assert the results. Ember's [`wait` helper](../../testing/testing-components/#toc_waiting-on-asynchronous-behavior) waits for all promises to resolve before running the given function callback and finishing the test.

```tests/integration/components/list-filter-test.js
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | filter listing', {
  integration: true
});

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

test('should initially load all listings', function (assert) {
  // we want our actions to return promises, since they are potentially fetching data asynchronously
  this.on('filterByCity', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  // with an integration test, you can set up and use your component in the same way your application
  // will use it.
  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // the wait function will return a promise that will wait for all promises
  // and xhr requests to resolve before running the contents of the then block.
  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});
```
For our second test, we'll check that typing text in the filter will actually appropriately call the filter action and update the listings shown.

We force the action by generating a `keyUp` event on our input field, and then assert that only one item is rendered.

```tests/integration/components/list-filter-test.js
test('should update with matching listings', function (assert) {
  this.on('filterByCity', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // The keyup event here should invoke an action that will cause the list to be filtered
  this.$('.list-filter input').val('San').keyup();

  return wait().then(() => {
    assert.equal(this.$('.city').length, 1);
    assert.equal(this.$('.city').text().trim(), 'San Francisco');
  });
});

```

Next, in our `app/templates/rentals.hbs` file, we'll add our new `list-filter` component in a similar way to what we did in our test.  Instead of just showing the city, we'll use our `rental-listing` component to display details of the rental.

```app/templates/rentals.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>
    We hope you find exactly what you're looking for in a place to stay.
  </p>
  {{#link-to 'about' class="button"}}
    About Us
  {{/link-to}}
</div>

{{#list-filter
   filter=(action 'filterByCity')
   as |rentals|}}
  <ul class="results">
    {{#each rentals as |rentalUnit|}}
      <li>{{rental-listing rental=rentalUnit}}</li>
    {{/each}}
  </ul>
{{/list-filter}}
```

Now that we have failing tests and an idea of what we want our component contract to be, we'll implement the component.
We want the component to simply provide an input field and yield the results list to its block, so our template will be simple:

```app/templates/components/list-filter.hbs
{{input value=value key-up=(action 'handleFilterEntry') class="light" placeholder="Filter By City"}}
{{yield results}}
```

The template contains an [`{{input}}`](../../templates/input-helpers) helper that renders as a text field, in which the user can type a pattern to filter the list of cities used in a search.
The `value` property of the `input` will be bound to the `value` property in our component.
The `key-up` property will be bound to the `handleFilterEntry` action.

Here is what the component's JavaScript looks like:

```app/components/list-filter.js
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.get('filter')('').then((results) => this.set('results', results));
  },

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.get('value');
      let filterAction = this.get('filter');
      filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
    }
  }

});
```

We use the `init` hook to seed our initial listings by calling the `filter` action with an empty value.
Our `handleFilterEntry` action calls our filter action based on the `value` attribute set by our input helper.

The `filter` action is [passed](../../components/triggering-changes-with-actions/#toc_passing-the-action-to-the-component) in by the calling object. This is a pattern known as _closure actions_.

To implement these actions, we'll create a `rentals` controller.
Controllers can contain actions and properties available to the template of its corresponding route.

Generate a controller for the `rentals` route by running the following:

```shell
ember g controller rentals
```

Now, define your new controller like so:

```app/controllers/rentals.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterByCity(param) {
      if (param !== '') {
        return this.get('store').query('rental', { city: param });
      } else {
        return this.get('store').findAll('rental');
      }
    }
  }
});
```

When the user types in the text field in our component, the `filterByCity` action in the controller is called.
This action takes in the `value` property, and filters the `rental` data for records in data store that match what the user has typed thus far.
The result of the query is returned to the caller.

For this action to work, we need to replace our Mirage `config.js` file with the following, so that it can respond to our queries.

```mirage/config.js
export default function() {
  this.namespace = '/api';

  let rentals = [{
      type: 'rentals',
      id: 'grand-old-mansion',
      attributes: {
        title: 'Grand Old Mansion',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        type: 'Estate',
        bedrooms: 15,
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
      }
    }, {
      type: 'rentals',
      id: 'urban-living',
      attributes: {
        title: 'Urban Living',
        owner: 'Mike Teavee',
        city: 'Seattle',
        type: 'Condo',
        bedrooms: 1,
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        description: "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro."
      }
    }, {
      type: 'rentals',
      id: 'downtown-charm',
      attributes: {
        title: 'Downtown Charm',
        owner: 'Violet Beauregarde',
        city: 'Portland',
        type: 'Apartment',
        bedrooms: 3,
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
        description: "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet."
      }
    }];

  this.get('/rentals', function(db, request) {
    if(request.queryParams.city !== undefined) {
      let filteredRentals = rentals.filter(function(i) {
        return i.attributes.city.toLowerCase().indexOf(request.queryParams.city.toLowerCase()) !== -1;
      });
      return { data: filteredRentals };
    } else {
      return { data: rentals };
    }
  });
}
```

After updating our mirage configuration, we should see passing tests, as well as a simple filter on your home screen, that will update the rental list as you type:

![home screen with filter component](../../images/autocomplete-component/styled-super-rentals-filter.png)

![passing acceptance tests](../../images/autocomplete-component/passing-acceptance-tests.png)
