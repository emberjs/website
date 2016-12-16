Ember has a rich ecosystem of addons that can be easily added to projects.
Addons provide a wide range of functionality to projects, often saving time and letting you focus on your project.

To browse addons, visit the [Ember Observer](https://emberobserver.com/) website.  It catalogs and categorizes ember addons that have been published to NPM and assigns them a score based on a variety of criteria.

For Super Rentals, we'll take advantage of two addons: [ember-cli-tutorial-style](https://github.com/toddjordan/ember-cli-tutorial-style) and [ember-cli-mirage](http://www.ember-cli-mirage.com/).

### ember-cli-tutorial-style

Instead of having you copy/paste in CSS to style Super Rentals, we've created an addon called [ember-cli-tutorial-style](https://github.com/ember-learn/ember-cli-tutorial-style) that instantly adds CSS to the tutorial.
The addon works by creating a file called `ember-tutorial.css` and putting that file in the super-rentals `vendor` directory.
As Ember CLI runs, it takes the `ember-tutorial` CSS file and puts it in `vendor.css` (which is referenced in `app/index.html`).
We can make additional style tweaks to `vendor/ember-tutorial.css`, and the changes will take effect whenever we restart the app.

Run the following command to install the addon:

```shell
ember install ember-cli-tutorial-style
```

Since Ember addons are npm packages, `ember install` installs them in the `node_modules` directory, and makes an entry
in `package.json`. Be sure to restart your server after the addon has installed successfully. Restarting the server will
incorporate the new CSS and refreshing the browser window will give you this:

![super rentals styled homepage](../../images/installing-addons/styled-super-rentals-basic.png)

### ember-cli-mirage

[Mirage](http://www.ember-cli-mirage.com/) is a client HTTP stubbing library often used for Ember acceptance testing.
For the case of this tutorial, we'll use mirage as our source of data.
Mirage will allow us to create fake data to work with while developing our app and mimic a running backend server.

Install the Mirage addon as follows:

```shell
ember install ember-cli-mirage
```

If you were running `ember serve` in another shell, restart the server to include Mirage in your build.

Let's now configure Mirage to send back our rentals that we had defined above by updating `mirage/config.js`:

```mirage/config.js
export default function() {
  this.namespace = '/api';

  this.get('/rentals', function() {
    return {
      data: [{
        type: 'rentals',
        id: 'grand-old-mansion',
        attributes: {
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          type: 'Estate',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
        }
      }]
    };
  });
}
```

This configures Mirage so that whenever Ember Data makes a GET request to `/api/rentals`, Mirage will return this JavaScript object as JSON.
In order for this to work, we need our application to default to making requests to the namespace of `/api`.
Without this change, navigation to `/rentals` in our application would conflict with Mirage.

To do this, we want to generate an application adapter.

```shell
ember generate adapter application
```

This adapter will extend the [`JSONAPIAdapter`][1] base class from Ember Data:

[1]: http://emberjs.com/api/data/classes/DS.JSONAPIAdapter.html

```app/adapters/application.js
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api'
});

```
