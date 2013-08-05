### Peepcode Ordr Application

The **Ordr** application code is used by permission from [PeepCode]. See the 
[Fire up Ember.js video] page for details and diagrams of the application. The 
Peepcode tutorial video is excellent and worth the purchase price. If you are 
learning Ember.js, perhaps buy the video tutorial.

#### Learning by example

The Ordr application is a great application to reference for a testing
guide, it's...

1.  Small
    * 85 lines of Javascript
    * <100 lines of HTML/templating
1.  Sophisticated
    * 5 classes
    * Key relationships
    * Exploits Ember.js features 
      (which it should since it's an Ember.js tutorial!)

Hence, it's a reasonable "smallest realistic" Ember.js application to
"learn with".

### Application Code

The following application code is the result of completing the PeepCode tutorial 
video.

This guide covers testing an application that is already written, so the 
practice of test-driven development is not covered, but recommended. This guide 
includes examples of both integration and unit tests.

**Warning: This application uses Ember Data, "Use with caution"**

```javascript
window.App = Ember.Application.create();
App.deferReadiness();

// Router
App.Router.map(function() {
  this.resource('tables', function() {
    this.resource('table', { path: ':table_id' });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('tables');
  }
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('food').set('model', App.Food.find());
  }
});

App.TablesRoute = Ember.Route.extend({
  model: function() {
    return App.Table.find();
  }
});

// Controllers
// Implement explicitly to use the object proxy.
App.TablesController = Ember.ArrayController.extend({
  sortProperties: ['id']
});

App.TableController = Ember.ObjectController.extend();

App.FoodController = Ember.ArrayController.extend({
  needs: 'table',
  addFood: function(food) {
    var tabItems = this.get('controllers.table.tab.tabItems');

    tabItems.createRecord({
      food: food,
      cents: food.get('cents')
    });
  }
});

// Handlebars Helpers
Ember.Handlebars.registerBoundHelper('money', function(value) {
  if (isNaN(value)) { return '0.00'; }
  return (value % 100 === 0 ?
          value / 100 + '.00' :
          parseInt(value / 100, 10) + '.' + value % 100);
});

// Models
App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Table = DS.Model.extend({
  tab: DS.belongsTo('App.Tab')
});

App.Tab = DS.Model.extend({
  tabItems: DS.hasMany('App.TabItem'),
  cents: function() {
    return this.get('tabItems').getEach('cents').reduce(function(accum, item) {
      return accum + item;
    }, 0);
  }.property('tabItems.@each.cents')
});

App.TabItem = DS.Model.extend({
  cents: DS.attr('number'),
  food: DS.belongsTo('App.Food')
});

App.Food = DS.Model.extend({
  name: DS.attr('string'),
  imageUrl: DS.attr('string'),
  cents: DS.attr('number')
});
```
_Source code of the Ordr application by PeepCode, used by permission._

### Compiled Templates

The PeepCode tutorial video demonstrates using `script` elements for Handlebars
templates. For the sake of brevity this guide will use pre-compiled
templates while testing.

```javascript
Ember.TEMPLATES['_tableMenu']=Ember.Handlebars.compile("  <h2>Tables</h2>\n  {{#each table in controller}}\n  {{#linkTo \"table\" table class=\"panel six columns\"}} {{ table.id }}{{/linkTo}}\n  {{/each}}");
Ember.TEMPLATES['application']=Ember.Handlebars.compile("  <div class=\"row\">\n    <div class=\"twelve columns\">\n      <h1>Ordr</h1>\n      <hr>\n      <p>{{outlet}}</p>\n    </div>\n  </div>");
Ember.TEMPLATES['food']=Ember.Handlebars.compile("  <ul id=\"menu\">\n    {{#each controller}}\n    <li>\n      <a href=\"#\" {{action \"addFood\" this}}>\n        <img {{ bindAttr src=\"imageUrl\" }}>\n        <p>{{ name }}</p>\n      </a>\n    </li>\n    {{/each}}\n  </ul>");
Ember.TEMPLATES['tab']=Ember.Handlebars.compile("  <ul id=\"customer-tab\">\n    {{#each tabItem in tabItems}}\n    <li><h3>{{tabItem.food.name}} <span>${{money tabItem.cents}}</span></h3></li>\n    {{else}}\n    <li><h3>Click a food to add it</h3></li>\n    {{/each}}\n    <li id=\"total\"><h3>Total <span>${{money cents}}</span></h3></li>\n  </ul>");
Ember.TEMPLATES['table']=Ember.Handlebars.compile("  <div class=\"row\">\n    <div class=\"three columns\">\n      {{ render \"food\" }}\n    </div>\n    <div class=\"nine columns\">\n      <h2>Table <span>{{ id }}</span></h2>\n      {{ render \"tab\" tab }}\n    </div>\n  </div>");
Ember.TEMPLATES['tables']=Ember.Handlebars.compile("  <div class=\"row\">\n    <div class=\"four columns\" id=\"tables\">\n      {{ partial \"tableMenu\" }}\n    </div>\n    <div class=\"eight columns\" id=\"order\">\n      {{ outlet }}\n    </div>\n  </div>");
Ember.TEMPLATES['tables/index']=Ember.Handlebars.compile("  <h2>Select a table at left</h2>");
```

#### Credits

Thanks to [PeepCode][peepcode] for giving permission to publish tests 
written using the Ordr application.  Watch the highly recommend 
[Fire up Ember.js video] tutorial.

The test code in this guide can be found in a [peepcode-ordr-test] repository 
created by the Ember-SC meetup group. Ember-SC members did receive permission 
from PeepCode to publish the Ordr application and must do so with a link to the 
[Fire up Ember.js video] to comply with the permission to publish the Ordr 
application source code.


[PeepCode]: https://peepcode.com "Screencast tutorials for professional web developers and designers"
[Fire up Ember.js video]: https://peepcode.com/products/emberjs "Ember.js Tutorial video by Peepcode"
[peepcode-ordr-test]: https://github.com/Ember-SC/peepcode-ordr-test "Ember-SC Meetup PeepCode Ordr Test Repository: QUnit branch"
