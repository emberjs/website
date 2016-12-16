Ember uses routes to define logical, addressable pages within our application.

In Super Rentals we want to arrive at a home page which shows a list of rentals.
From there, we should be able to navigate to an about page and a contact page.

Let's start by building our "about" page.
Remember, when the URL path `/about` is loaded,
the router will map the URL to the route handler of the same name, _about.js_.
The route handler then loads a template.

## An About Route

If we run `ember help generate`, we can see a variety of tools that come with Ember for automatically generating files for various Ember resources.
Let's use the route generator to start our `about` route.

```shell
ember generate route about
```

or for short,

```shell
ember g route about
```

We can then see what actions were taken by the generator:

```shell
installing route
  create app/routes/about.js
  create app/templates/about.hbs
updating router
  add route about
installing route-test
  create tests/unit/routes/about-test.js
```

Three new files are created: one for the route handler, one for the template the route handler will render,
and a test file.
The fourth file that is touched is the router.

When we open the router, we can see that the generator has mapped a new _about_ route for us.
This route will load the `about` route handler.

```app/router.js
import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
});

export default Router;
```

By default, the `about` route handler loads the `about.hbs` template.
This means we don't actually have to change anything in the new `app/routes/about.js` file for the `about.hbs` template to render as we want.

With all of the routing in place from the generator, we can get right to work on coding our template.
For our `about` page, we'll add some HTML that has a bit of information about the site:

```app/templates/about.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
</div>
```

Run `ember serve` (or `ember s` for short) from the shell to start the Ember development server,
and then go to [`http://localhost:4200/about`](http://localhost:4200/about) to see our new app in action!

## A Contact Route

Let's create another route with details for contacting the company.
Once again, we'll start by generating a route, a route handler, and a template.

```shell
ember g route contact
```

We see that our generator has created a `contact` route in the `app/router.js` file,
and a corresponding route handler in `app/routes/contact.js`.
Since we will be using the `contact` template, the `contact` route does not need any additional changes.

In `contact.hbs`, we can add the details for contacting our Super Rentals HQ:

```app/templates/contact.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Contact Us</h2>
  <p>Super Rentals Representatives would love to help you<br>choose a destination or answer
    any questions you may have.</p>
  <p>
    Super Rentals HQ
    <address>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </address>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </p>
</div>
```

Now we have completed our second route.
If we go to the URL [`http://localhost:4200/contact`](http://localhost:4200/contact), we'll arrive on our contact page.

## Navigating with Links and the {{link-to}} Helper

We really don't want users to have to know our URLs in order to move around our site,
so let's add some navigational links at the bottom of each page.
Let's make a contact link on the about page and an about link on the contact page.

Ember has built-in **helpers** that provide functionality such as linking to other routes.
Here we will use the `{{link-to}}` helper in our code to link between routes:

```app/templates/about.hbs{+9,+10,+11}
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
  {{#link-to 'contact' class="button"}}
    Get Started!
  {{/link-to}}
</div>
```

The `{{link-to}}` helper takes an argument with the name of the route to link to, in this case: `contact`.
When we look at our about page at [`http://localhost:4200/about`](http://localhost:4200/about), we now have a working link to our contact page.

![super rentals about page screenshot](../../images/routes-and-templates/ember-super-rentals-about.png)

Now, we'll add a link to our contact page so we can navigate back and forth between `about` and `contact`.

```app/templates/contact.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Contact Us</h2>
  <p>Super Rentals Representatives would love to help you<br>choose a destination or answer
    any questions you may have.</p>
  <p>
    Super Rentals HQ
    <address>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </address>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </p>
  {{#link-to 'about' class="button"}}
    About
  {{/link-to}}
</div>
```

## A Rentals Route
We want our application to show a list of rentals that users can browse.
To make this happen we'll add a third route and call it `rentals`.

```shell
ember g route rentals
```

Let's update the newly generated `rentals.hbs` with some basic markup to seed our rentals list page.
We'll come back to this page later to add in the actual rental properties.

```app/templates/rentals.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  {{#link-to 'about' class="button"}}
    About Us
  {{/link-to}}
</div>
```

## An Index Route

With our two static pages in place, we are ready to add our home page which welcomes users to the site.
At this point our main page in our application is our rentals page, for which we've already created a route.
So we want our index route to simply forward to the `rentals` route we've already created.

Using the same process we did for our about and contact pages, we will first generate a new route called `index`.

```shell
ember g route index
```

We can see the now familiar output for the route generator:

```shell
installing route
  create app/routes/index.js
  create app/templates/index.hbs
installing route-test
  create tests/unit/routes/index-test.js
```

Unlike the other route handlers we've made so far, the `index` route is special:
it does NOT require an entry in the router's mapping.
We'll learn more about why the entry isn't required when we look at [nested routes](../subroutes) in Ember.

We can start by implementing the unit test for index.
Since all we want to do is transition to `rentals`, our unit test will make sure that the route's [`replaceWith`](http://emberjs.com/api/classes/Ember.Route.html#method_replaceWith) method is called with the desired route.
`replaceWith` is similar to the route's `transitionTo` function, the difference being that `replaceWith` will replace the current URL in the browser's history, while `transitionTo` will add to the history.
Since we want our `rentals` route to serve as our home page, we will use the `replaceWith` function.
We'll verify that by stubbing the `replaceWith` method for the route and asserting that the `rentals` route is passed when called.

```tests/unit/routes/index-test.js
import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index');

test('should transition to rentals route', function(assert) {
  let route = this.subject({
    replaceWith(routeName) {
      assert.equal(routeName, 'rentals', 'replace with route name rentals');
    }
  });
  route.beforeModel();
});
```

In our index route, we simply add the `replaceWith` invocation.

```app/routes/index.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);
    this.replaceWith('rentals');
  }
});
```

Now visiting the root route `/` will result in the `/rentals` URL loading.

## Adding a Banner with Navigation

In addition to providing button-style links in each route of our application, we would like to provide a common banner to display both the title of our application, as well as its main pages.

First, create the application template by typing `ember g template application`.

```shell
installing template
  create app/templates/application.hbs
```

When `application.hbs` exists, anything you put in it is shown for every page in the application. Now add the following banner navigation markup:


```app/templates/application.hbs
<div class="container">
  <div class="menu">
    {{#link-to 'index'}}
      <h1 class="left">
        <em>SuperRentals</em>
      </h1>
    {{/link-to}}
    <div class="left links">
      {{#link-to 'about'}}
        About
      {{/link-to}}
      {{#link-to 'contact'}}
        Contact
      {{/link-to}}
    </div>
  </div>
  <div class="body">
    {{outlet}}
  </div>
</div>
```

Notice the inclusion of an `{{outlet}}` within the body `div` element.  The [`{{outlet}}`](http://emberjs.com/api/classes/Ember.Templates.helpers.html#method_outlet) defers to the router, which will render in its place the markup for the current route, meaning the different routes we develop for our application will get rendered there.

Now that we've added routes and linkages between them, the three acceptance tests we created for navigating to our routes will now pass.

![passing navigation tests](../../images/routes-and-templates/passing-navigation-tests.png)
