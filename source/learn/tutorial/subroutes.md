Up to this point, we've generated four top level routes.

* An `about` route, that gives information on our application.
* A `contact` route, with information on how to contact the company.
* A `rentals` route, where we will allow users to browse rental properties.
* The `index` route, which we've set up to redirect to the `rentals` route.

Our `rentals` route is going to serve multiple functions.
From our [acceptance tests](../acceptance-test), we've shown that we want our users to be able to browse and search rentals, as well as see detailed information for individual rentals.
To satisfy that requirement, we are going to make use of Ember's [nested route capability](../../routing/defining-your-routes/#toc_nested-routes).

By the end of this section we want to have created the following new routes:

* A `rentals/index` route that displays the rental page's general information, and also lists available rentals.
The index nested route is shown by default when the user visits the `rentals` URL.
* A `rentals/show` route that still displays the rental page's general information, while also showing detailed information about a selected rental.
The `show` route will get substituted with the id of the rental being shown (for example `rentals/grand-old-mansion`).

## The Parent Route

Previously, in the [Routes and Templates tutorial](../routes-and-templates), we set up a `rentals` route.

Opening the template for this route reveals an outlet underneath the route's general page information.
At the bottom of the template, you'll notice an `{{outlet}}` helper.
This is where the active nested route will be rendered.

```app/templates/rentals.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
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
{{outlet}}
```

Having a parent route means that any content on our parent route template will be present as we browse down through our child routes, allowing us to add things like common instructions, navigation, footers or sidebars.

## Generating a Nested Index Route

The first nested route to generate will be the index route.
An index nested route works similarly to the base index route.
It is the default route that renders when no route is provided.
Therefore in our case, when we navigate to `/rentals`, Ember will attempt to load the rentals index route as a nested route.

To create an index nested route, run the following command:

```shell
ember g route rentals/index
```

If you open up your Router (`app/router`) you may notice that nothing has updated.

```app/router.js
Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('rentals');
});
```

Much like how our application's `index` route doesn't appear in our Router, `index` routes on sub-routes won't explicitly appear in the Router either.
Ember knows that the default action is to take the user to the `index` route.
However, you can add the `index` route if you want to customize it.
For example, you can modify the `index` route's path by specifying `this.route('index', { path: '/custom-path'})`.

In the section on [using Ember Data](../ember-data#toc_updating-the-model-hook), we added a call to fetch all rentals.
Let's implement our newly generated `rentals/index` route by moving this `findAll` call from the parent `rentals` route to our new sub-route.

```app/routes/rentals.js{-2,-3,-4}
export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('rental');
  }
});
```

```app/routes/rentals/index.js{+2,+3,+4}
export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('rental');
  }
});
```

Now that we are returning all of our rentals to the nested route's model, we will also move the rental list markup from our main route template to our nested route index template.

```app/templates/rentals.hbs{-9,-10,-11,-12,-13,-14,-15,-16,-17}
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
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
{{outlet}}
```

```app/templates/rentals/index.hbs{+1,+2,+3,+4,+5,+6,+7,+8,+9}
{{#list-filter
   filter=(action 'filterByCity')
   as |rentals|}}
  <ul class="results">
    {{#each rentals as |rentalUnit|}}
      <li>{{rental-listing rental=rentalUnit}}</li>
    {{/each}}
  </ul>
{{/list-filter}}
{{outlet}}
```

Finally, we need to make our controller that has our filter action available to the new nested index route.

Start by running `ember g controller rentals/index` to create an index controller for our nested route.

Instead of copying the whole controller file over to `app/controller/rentals/index.js` from `app/controller/rentals.js`, we'll just take advantage of JavaScript's import/export feature to re-export the rentals controller as the rentals/index controller:

```app/controller/rentals/index.js
import RentalsController from '../rentals';

export default RentalsController;
```

## Setting up Data for the Nested Detail Route

Next, we will want to create a sub-route that will list information for a specific rental.
To do this, we will need to update a couple of files.
To find a specific rental, we will want to use Ember Data's `findRecord` function [(see "Finding Records" for more details)](../../models/finding-records/).
The `findRecord` function requires that we search by a unique key.

While on the `show` route, we will also want to show additional information about our specific rental.

In order to do this, we will need to modify the Mirage `config.js` file that we added
back in the [Installing Addons section](../installing-addons). We will add a new route
handler to return a specific rental:

```mirage/config.js{+57,+58,+59,+60}
export default function() {
  this.namespace = '/api';

  let rentals = [
    {
      type: 'rentals',
      id: 'grand-old-mansion',
      attributes: {
        title: "Grand Old Mansion",
        owner: "Veruca Salt",
        city: "San Francisco",
        type: "Estate",
        bedrooms: 15,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
        description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
      }
    },
    {
      type: 'rentals',
      id: 'urban-living',
      attributes: {
        title: "Urban Living",
        owner: "Mike Teavee",
        city: "Seattle",
        type: "Condo",
        bedrooms: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg",
        description: "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro."
      }
    },
    {
      type: 'rentals',
      id: 'downtown-charm',
      attributes: {
        title: "Downtown Charm",
        owner: "Violet Beauregarde",
        city: "Portland",
        type: "Apartment",
        bedrooms: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg",
        description: "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet."
      }
    }
  ];

  this.get('/rentals', function(db, request) {
    if (request.queryParams.city !== undefined) {
      let filteredRentals = rentals.filter(function (i) {
        return i.attributes.city.toLowerCase().indexOf(request.queryParams.city.toLowerCase()) !== -1;
      });
      return { data: filteredRentals };
    } else {
      return { data: rentals };
    }
  });

  // Find and return the provided rental from our rental list above
  this.get('/rentals/:id', function (db, request) {
    return { data: rentals.find((rental) => request.params.id === rental.id) };
  });

};

```

## Generating a Nested Detail Route

Now that our API is ready to return individual rentals, we can generate our `show` sub-route.
Much like generating our `rentals` route, we will use `ember g` to create a nested route.

```shell
ember g route rentals/show
```

You will see output like this:

```shell
installing route
  create app/routes/rentals/show.js
  create app/templates/rentals/show.hbs
updating router
  add route rentals/show
installing route-test
  create tests/unit/routes/rentals/show-test.js
```

Let's start by looking at the changes to our Router (`app/router.js`).

```app/router.js{+5}
Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('rentals', function() {
    this.route('show');
  });
});
```

Our new route is nested within our `rentals` route.
This tells Ember that it is a sub-route and will be accessed through `localhost:4200/rentals/show`.

To tell the application which rental we want to access, we need to replace the `show` route path with the ID of the rental listing.
We also want to simplify the URL so that it looks more like this: `localhost:4200/rentals/id-for-rental`.

To do that, we modify our route as follows:

```app/router.js{+5}
Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('rentals', function() {
    this.route('show', { path: '/:rental_id' });
  });
});
```

The `rental_id` will now be passed to the route.


## Finding By ID

Next, we want to edit our `show` route to retrieve the requested rental:

```app/routes/rentals/show.js{+2,+3,+4}
export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('rental', params.rental_id);
  }
});
```

Since we added `:rental_id` to the `show` path in our router, `rental_id` is now available in our `model` hook.
When we call `this.get('store').findRecord('rental', params.rental_id)`, Ember Data queries `/rentals/our-id` using a HTTP GET request ([learn more about that here](../../models/)).

## Adding the Rental To Our Template

Next, we can update the template for our show route (`app/templates/rentals/show.hbs`) and list the information for our rental.

```app/templates/rentals/show.hbs
<div class="jumbo show-listing">
  <h2 class="title">{{model.title}}</h2>
  <div class="right detail-section">
    <div class="detail owner">
      <strong>Owner:</strong> {{model.owner}}
    </div>
    <div class="detail">
      <strong>Type:</strong> {{rental-property-type model.type}} - {{model.type}}
    </div>
    <div class="detail">
      <strong>Location:</strong> {{model.city}}
    </div>
    <div class="detail">
      <strong>Number of bedrooms:</strong> {{model.bedrooms}}
    </div>
    <p class="description">{{model.description}}</p>
  </div>
  <img src="{{model.image}}" class="rental-pic">
</div>
```

Now browse to `localhost:4200/rentals/grand-old-mansion` and you should see the information listed for that specific rental.

![Rental Page Nested Show Route](../../images/subroutes/subroutes-super-rentals-show.png)

## Linking to a Specific Rental

Now that we can load pages for individual rentals, we'll add a link (using the `link-to` helper) within our `rental-listing` component to navigate to individual pages.
Here, the `link-to` helper takes the route name and the rental model object as arguments.
When you pass an object as second argument into the `link-to` block helper, it will by default [serialize](http://emberjs.com/api/classes/Ember.Route.html#method_serialize) the object to the ID of the model into the URL.
Alternately, you may just pass `rental.id` for clarity.

Clicking on the title will load the detail page for that rental.

```app/templates/components/rental-listing.hbs{+6}
<article class="listing">
  <a {{action 'toggleImageSize'}} class="image {{if isWide "wide"}}">
    <img src="{{rental.image}}" alt="">
    <small>View Larger</small>
  </a>
  <h3>{{#link-to "rentals.show" rental}}{{rental.title}}{{/link-to}}</h3>
  <div class="detail owner">
    <span>Owner:</span> {{rental.owner}}
  </div>
  <div class="detail type">
    <span>Type:</span> {{rental-property-type rental.type}} - {{rental.type}}
  </div>
  <div class="detail location">
    <span>Location:</span> {{rental.city}}
  </div>
  <div class="detail bedrooms">
    <span>Number of bedrooms:</span> {{rental.bedrooms}}
  </div>
  {{location-map location=rental.city}}
</article>
```
![Rental Page Nested Index Route](../../images/subroutes/subroutes-super-rentals-index.png)

## Final Check

At this point all our tests should pass, including the [list of acceptance tests](../acceptance-test) we created as our beginning requirements.

![Acceptance Tests Pass](../../images/subroutes/all-acceptance-pass.png)

At this point you can do a [deployment](../deploying) and share your Super Rentals application to the world
or you can use this as a base to explore other Ember features and addons.
Regardless, we hope this has helped you get started with creating your own ambitious applications with Ember!
