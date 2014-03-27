
When it comes to running your tests there are multiple approaches that you can take depending on what best suits your work flow. Finding a low friction method of running your tests is important because it is something that you will be doing quite often.


### The Testem Runner

The [Testem runner][testem] is one approach. To get started using `testem` you will need to install the `testem` node.js module. Here is an example of a [package.json][package.json] file which includes everything that you will need to get started.

```javascript
// package.json
{
  "name": "your_project_name",
  "version": "0.1.0",
  "devDependencies": {
    "testem": "0.6.12"
  }
}
```

Now that you've got a `package.json` containing everything that you will need to get started with `testem` run the following command (in the same directory as your `package.json` file) to download and install
`testem`.

```bash
npm install
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
    "launch_in_ci": ["PhantomJS"],
}
```

That is it. Everything that you need is installed and configured. Let's go over the configuration in more detail.

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

The [Karma test runner][karma] is a different approach. To get started using `karma` you will need to install a few node modules. Here is an example of a [package.json][package.json] file which includes everything that you will need to get started.

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

`Karma` along with everything else that you need to start running your tests is now available. There is a little bit of configuration that  needs to be done first. If you want to generate the default `karma` configuration you can run `karma init` and that will create a `karma.conf.js` file in your current directory. There is a lot more configuration than what is required, so here is a paired down version of the minimum configuration that Karma requires to run your tests.

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['qunit'],
    files: [
      "your_ember_code_here.js",
      "your_test_code_here.js"
    ],
    autoWatch: true,
    singleRun: true,
    browsers: ['PhantomJS']
  });
};
```
There is one last thing that you need to install which is Karma's command line interface.

```bash
npm install -g karma-cli
```

That is it. Everything that you need is installed and configured. Let's go over the configuration in more detail.

* `frameworks`
 - This represents the testing frameworks that you are going to be using. Qunit is what we are using in this example. `Karma` takes care of getting the qunit library loaded up so you don't have to worry about it.
* `files`
 - This represents which of your source files (including both production and test code) that you want `karma` to load when running tests.
* `autoWatch`
 - A value of `true` will mean that `karma` will watch all of the `files` for changes and rerun the tests only when `singleRun` is `false`.
* `singleRun`
 - A value of `true` will run all of the tests once time and shut down, whereas a value of `false` will run all of the tests and wait for files to change and will run them again.
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


[ci]: ???
[testem]: ????
[karma]:http://karma-runner.github.io/
[package.json]: https://www.npmjs.org/doc/json.html
[sauce_labs]: https://saucelabs.com/
[karma_github]: https://github.com/karma-runner?query=launcher
