Below are examples of a [QUnit] test runner and an example of custom test 
helpers. In this case the testing support code combines the definition of the 
helpers and the execution of code to setup the applicaiton for testing.

### QUnit Test Runner

The example HTML document includes CSS styles to display the working application 
below the QUnit test runner.

While under test the application can use a different root element, in this case `#app-root` is used to identify the Ember.js applications's root element.

The libraries listed in the HTML document below are same versions distributed 
with the Ember.js [starter kit] repository, please see the starter kit 
repository for the lastest recommended versions for building Ember.js 
applications.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Peepcode Ordr Tests</title>
  <meta name="viewport" content="width=device-width" />

  <link rel="stylesheet" href="./support/qunit-1.12.0.css">
  <link rel="stylesheet" href="./css/foundation.css">
  <link rel="stylesheet" href="./css/app.css">
  <style type="text/css">
    #qunit-fixture, #app-root {
      position: relative;
      top: 0;
      left: 0;
      width: auto;
      height: auto;
    }
  </style>

</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>

  <!-- Libraries (Dependencies) -->
  <script src="./js/libs/jquery-1.9.1.js"></script>
  <script src="./js/libs/handlebars-1.0.0-rc.4.js"></script>
  <script src="./js/libs/ember-1.0.0-rc.6.1.js"></script>
  <script src="./js/libs/ember-data.js"></script>

  <!-- App and Templates -->
  <script src="./js/templates.js"></script>
  <script src="./js/app.js"></script>

  <!-- Test Helpers -->
  <script src="./support/test_helper.js"></script>

  <!-- Test Library -->
  <script src="./support/qunit-1.12.0.js"></script>

  <!-- Integration Tests -->
  <script src="./integration/tables_test.js"></script>
  <script src="./integration/tabs_test.js"></script>

  <!-- Unit Tests -->
  <script src="./unit/handlebars_helper_test.js"></script>
  <script src="./unit/food_controller_test.js"></script>
  <script src="./unit/models_test.js"></script>

</body>
</html>
```

### Setup For Testing

The example is this guide uses two (2) methods to prepare the application for 
testing:

```javascript
App.setupForTesting();
App.injectTestHelpers();
```

Added to the Ordr application is a call to [deferReadiness]
`App.deferReadiness()`, used to perform asynchronous setup logic and defer 
booting the application. The `deferReadiness` call was not included in the 
tutorial video, and requires `App.advanceReadiness()` to run the application 
when not under test.

### Custom Test Helpers

See the End-to-End Tests page for an example integration test that verifies the 
default route of the Ordr application. A custom test helper is used to confirm 
the route. Below is the helper:

```javascript
Ember.Test.registerHelper('path', function() {
  return testing().path();
});
```

A custom helper object is used to introspect application state. The helpers are 
defined in a support file loaded only during testing.

### Support File

The test helper and test setup code can be combined in a single file and loaded 
when testing the application.

In the example below, helper methods are defined to assist both integration and 
unit testing. See the Unit Tests and End-to-End tests pages in this guide for 
examples which use custom test helpers: `path()` and `getFoodController()`, 
which are defined in the (support) file below.

```javascript
(function (host) {
  var document = host.document;
  var App = host.App;

  var testing = function(){
    var helper = {
      container: function(){
        return App.__container__;
      },
      controller: function( name ){
        return helper.container().lookup('controller:' + name);
      },
      path: function(){
        return helper.controller('application').get('currentPath');
      }
    };
    return helper;
  };

  Ember.Test.registerHelper('path', function() {
    return testing().path();
  });

  Ember.Test.registerHelper('getFoodController', function() {
    return testing().controller('food');
  });

  // Move app to an element on the page so it can be seen while testing.
  document.write('<div id="test-app-container"><div id="ember-testing"></div></div>');
  App.rootElement = '#ember-testing';
  App.setupForTesting();
  App.injectTestHelpers();

}(window));
```

The `App.rootElement` bas been changed while the applicaiton is under test so 
that both the test report and application are visible in the [QUnit] test runner.

See the [integration] testing page or read the [ember-testing package] code for 
more details on the helpers which facilitate testing asynchronous behavior 
within the application. Also, note that [QUnit] provides `start()` and `stop()` 
methods utilized by the `wait()` method (included with the Ember testing 
helpers). 

Async testing can be challenging, this guide uses the default test 
adapter that ships with the Ember Test package. QUnit provides solid support for 
async testing using it's `start` and `stop` methods which are utilized 
internally in the Ember Test package by the `wait` helper which internally calls 
`Test.adapter.asyncStart()` and `Test.adapter.asyncEnd()`.

**Warning:** This example of custom helpers includes a call to a private method 
of the Ember#Application object `__container__`; since it's used only in the 
helper, only while testing, and in only one function... when the private API 
changes this helper can be updated. This method should **not** be used by the 
application source code at all.


[QUnit]: http://qunitjs.com/ "Default testing library supported by the ember-testing package"
[starter kit]: https://github.com/emberjs/starter-kit "A starter kit for Ember"
[deferReadiness]: http://emberjs.com/api/classes/Ember.Application.html#method_deferReadiness "perform asynchronous setup logic and defer booting your application"
[integration]: /guides/testing/integration "integration testing page"
[ember-testing package]: https://github.com/emberjs/ember.js/tree/master/packages/ember-testing/lib "ember.js / packages / ember-testing / lib"
