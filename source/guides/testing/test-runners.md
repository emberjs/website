When it comes to running your tests there are multiple approaches that you can take depending on what best suits your workflow. Finding a low friction method of running your tests is important because it is something that you will be doing quite often.

### <a name="browser"></a>The Browser

The simplest way of running your tests is just opening a page in the browser. The following is how to put a test "harness" around your app with qunit so you can run tests against it:

First, get a copy of `qunit` (both the JavaScript and the css) from [here][qunit].

Next, create an HTML file that includes qunit and its css that looks like the following example.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit Example</title>
  <link rel="stylesheet" href="qunit.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="qunit.js"></script>
  <script src="your_ember_code_here.js"></script>
  <script src="your_test_code_here.js"></script>
</body>
</html>
```

Finally, launch your browser of choice and open the above html file.

That's it. You're done and your tests are running. No need to install and configure any other tools or have any other processes running. After adding or updating tests and/or code just reload the page and you're off to the races running your tests.

If that meets your needs, read no further. However, if you would like a more automated way of running your tests, read on.

Manually opening and refreshing a browser may prove to be a bit of a tedious workflow for you. While you get the benefit of knowing that your code (and your tests) work in every browser that you are able to launch, it's still up to you to do the launching (and then refreshing) each time you make a change. Getting rid of repetition is why we use computers, so this can be a problem.

Luckily there are tools to help with this. These tools allow you to run your tests in actual browsers (yes browsers - as in more than one at the same time) and then report the results back to you in a consolidated view. These tools are run from the command line and they are also capable of automatically re-running tests when changes are made to files. They require a bit more setup than creating a simple html file but they will likely save time in the long run.

### The Testem Runner

[Testem][testem] is a simple tool to setup and use. In a nutshell it will collect all of your application code, your test code, your testing framework of choice and build a test ["harness"](#browser) automatically.  It will then launch each browser (that you specify), run the tests and report the results back to you. It has a nice terminal-based user interface that will display test results for each browser. There are many features built into testem, but it does not seem to have any 3rd party plugins or extensions available.

To get started using `testem`, you'll need to install the `testem` node.js module. Assuming you have [node][node] installed, run the following command:

```bash
npm install -g --save-dev testem
```

`Testem` is now available to run your tests. There is just a little bit of configuration that needs to be done first.

```javascript
// testem.json
{
    "framework": "qunit",
    "src_files": [
      "your_ember_code_here.js",
      "your_test_code_here.js"
    ],
    "launch_in_dev": ["PhantomJS"],
    "launch_in_ci": ["PhantomJS"]
}
```

That's it. Everything you need is installed and configured. Let's go over the configuration in more detail.

* `framework`
 - This represents the testing framework that you are going to be using. Qunit is what we are using in this example. `Testem` takes care of getting the qunit library loaded up so you don't have to worry about it.
* `src_files`
 - This represents which of your source files (including both production and test code) that you want `testem` to load when running tests.
* `launch_in_dev`
 - This allows you to configure which browsers to launch and run the tests. This can be one or more browsers. When multiple are specified your tests will run in all browsers concurrently.
* `launch_in_ci`
 - This allows you to configure which browsers to launch and run the tests in 'ci' mode. This is specifically geared towards [continuous integration][ci] environments that may be headless.


There are plenty of other options that you can configure as well if you would like. To see a list of available options you can check out the [testem documentation][testem].

To start `testem` run the following command.

```bash
testem
```

This will start testem and launch all of your browsers listed in the `launch_in_dev` setting. A tabbed view, one tab for each browser listed, will appear that you can cycle through using the arrow keys to see the test results in each browser. There are other commands that you can use as well, run `testem -h` to see the list of all available commands in the tabbed view. `Testem` will continually run and re-run your tests when changes are made to your files listed in the `src_files` setting.

The `launch_in_ci` setting comes into play when you run `testem` with the following command.

```bash
testem ci
```

Much like running `testem` with no arguments, the `ci` option will use your same configuration except it will use the `launch_in_ci` rather than the `launch_in_dev` list of browsers. This `ci` option will also cause `testem` to run all of the tests once and exit printing the results to the terminal.


### The Karma Test Runner

[Karma][karma] is another simple tool to setup and use. It is similar to testem in that it will collect all of your application code, your test code, your testing framework of choice and build a test ["harness"](#browser) automatically. It will then launch each browser (that you specify), run the tests and report the results back to you. The terminal user interface is not as fancy as testem, but there is a colored display of test results for each browser. Karma has many features as well as many plugins. For information about writing karma plugins checkout [the docs][karma_plugins]. To find some available karma plugins start with [karma_runner][karma_github] on github.

To get started using `karma` you will need to install a few node modules. Here is an example of a [package.json][package.json] file which includes everything that you will need to get started.

```javascript
// package.json
{
  "name": "your_project_name",
  "version": "0.1.0",
  "devDependencies": {
    "karma-qunit": "0.1.1",
    "karma-phantomjs-launcher": "0.1.2",
    "karma": "0.12.1"
  }
}
```

The three dependencies are `karma` itself, `karma-qunit` which includes everything that you will need to run qunit tests and `karma-phantomjs-launcher` which is what `karma` will use to fire up an instance of the headless PhantomJS browser to run your tests in. There are a number of different launchers that you can plug into the `karma` test runner including but not limited to Google Chrome, FireFox, Safari, IE, and even [Sauce Labs][sauce_labs]. To see a complete list of all of the available launchers check out [Karma's Github][karma_github].

Now that you've got a `package.json` containing everything that you will need to get started with `karma` run the following command (in the same directory as your `package.json` file) to download and install everything.

```bash
npm install
```

`Karma` along with everything else that you need to start running your tests is now available. There is a little bit of configuration that needs to be done first. If you want to generate the default `karma` configuration you can run `karma init` and that will create a `karma.conf.js` file in your current directory. There are many configuration options available, so here's a pared down version: ie, the minimum configuration that Karma requires to run your tests.

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['qunit'],
    files: [
      'your_ember_code_here.js',
      'your_test_code_here.js'
    ],
    autoWatch: true,
    singleRun: true,
    browsers: ['PhantomJS']
  });
};
```
There is one last thing that you need to install: Karma's command line interface.

```bash
npm install -g karma-cli
```

That's it. Everything you need is installed and configured. Let's go over the configuration in more detail.

* `frameworks`
 - This represents the testing frameworks that you're going to use. We're using QUnit in this example. Karma takes care of loading up the QUnit library for you.
* `files`
 - This represents which of your source files (including both production and test code) that you want `karma` to load when running tests.
* `autoWatch`
 - A value of `true` will mean that `karma` will watch all of the `files` for changes and rerun the tests only when `singleRun` is `false`.
* `singleRun`
 - A value of `true` will run all of the tests one time and shut down, whereas a value of `false` will run all of your tests once, then wait for any files to change which will trigger re-running all your tests.
* `browsers`
 - This allows you to configure which browsers to launch and run the tests. This can be one or more browsers. When multiple are specified your tests will run in all browsers concurrently.


There are plenty of other options that you can configure as well if you would like. To see a list of available options you can check out the [Karma documentation][karma] or instead of manually creating `karma.conf.js` you can run the following command.

```bash
karma init
```

To start `karma` run

```bash
karma start
```

Depending on your configuration it will either run the tests and exit or run the tests and wait for file changes to run the tests again.


### Build Integration

Both `testem` and `karma` are capable of being integrated into larger build processes. For example, you may be using [CoffeeScript][coffee], [ES6][es6] or something else and need to [transpile][transpile] your source into `JavaScript`. If you happen to be using `grunt` you can use `grunt-contrib-testem` for `testem` or `grunt-karma` for `karma` integration into your existing build process. Both `testem` and `karma` have preprocessing configuration options available as well. For more information on other available configuration options see the docs for [karma][karma] or [testem][testem].


### Generating Reports

Oftentimes it's useful to get the results of your tests in different formats. For example, if you happen to use [Jenkins][jenkins] as a [ci][ci] server, you may want to get your test results in XML format so Jenkins can build some graphs of your test results over time. Also, you may want to measure your [code coverage][coverage] and have Jenkins track that over time as well. With these test runners, it's possible to generate reports from the results in various formats, as well as record other information such as code-test coverage, etc.

#### XML Test Results from Testem

To get [junit xml][junitxml] from the `testem` test runner you can simply add a flag to the command when you run `testem` and pipe the output to a file like the following command.

```bash
testem ci -R xunit > test-results.xml
```

That's it! Now you can use `test-results.xml` to feed into another tool.


#### XML Test Results from Karma

To get [junit xml][junitxml] from the `karma` test runner you will need to install a new node.js module. You can do so with the following command.

```bash
npm install --save-dev karma-junit-reporter
```

Once that is done you will need to update your karma configuration to include the following.

```javascript
module.exports = function(config) {
  config.set({
    /* snip */
    reporters: ['progress', 'junit'],
    /* snip */
  });
};
```

The reporters option determines how your test results are communicated back to you. The `progress` reporter will display a line that says something like this.

```
PhantomJS 1.9.7 (Mac OS X): Executed 2 of 2 SUCCESS (0.008 secs / 0.002 secs)
```

The `junit` reporter will create an xml file called `test-results.xml` in the current directory that contains junit xml which can be used as input to other tools. This file can be renamed to whatever you would like. For more information see the docs for [karma junit reporter][karma_junit_reporter].


#### Code Coverage from Testem

Getting coverage from `testem` is a bit more involved at the moment, though there **is** a way to do it. Check the [testem docs][testem_coverage] for more information.


#### Code Coverage from Karma

To measure your [code coverage][coverage] from the `karma` test runner you will need to install a new node.js module. You can do so with the following command.

```bash
npm install --save-dev karma-coverage
```

Once that's done you will need to update your karma configuration to include the following.

```javascript
module.exports = function(config) {
  config.set({
    /* snip */
    reporters: ['progress', 'coverage'],
    preprocessors: {
      "your_ember_code_here.js": "coverage",
      "your_test_code_here.js": "coverage"
    },
    coverageReporter: {
        type: "text",
    }
    /* snip */
  });
};
```

That's it. Now, running `karma` normally will display code coverage information in the terminal. The `coverageReporter.type` option can be set to a number of different values. The value in the example, `text`, will only display to the console. Some other options are `lcov`, `html` and `cobertura` which can be used as input to other tools. For additional configuration options on coverage reporting from `karma` check out their [docs][karma_coverage_docs].


[node]: http://nodejs.org/download/
[testem_coverage]: https://github.com/airportyh/testem/tree/master/examples/coverage_istanbul
[karma_coverage_docs]: http://karma-runner.github.io/0.8/config/coverage.html
[karma_junit_reporter]: https://github.com/karma-runner/karma-junit-reporter
[junitxml]: http://ant.apache.org/manual/Tasks/junitreport.html
[coverage]: http://en.wikipedia.org/wiki/Code_coverage
[qunit]: http://qunitjs.com/
[jenkins]: http://jenkins-ci.org/
[transpile]: http://en.wikipedia.org/wiki/Source-to-source_compiler
[es6]: http://square.github.io/es6-module-transpiler/
[ci]: http://en.wikipedia.org/wiki/Continuous_integration
[testem]: https://github.com/airportyh/testem
[coffee]: http://coffeescript.org/
[karma]: http://karma-runner.github.io/
[package.json]: https://www.npmjs.org/doc/json.html
[sauce_labs]: https://saucelabs.com/
[karma_github]: https://github.com/karma-runner?query=launcher
[karma_plugins]: http://karma-runner.github.io/0.10/config/plugins.html
[karma_runner]: https://github.com/karma-runner
