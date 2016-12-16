Welcome to the Ember Tutorial!
This tutorial is meant to introduce basic Ember concepts while creating a professional looking application.
If you get stuck at any point during the tutorial feel free to visit [https://github.com/ember-learn/super-rentals](https://github.com/ember-learn/super-rentals) for a working example of the completed app.

Ember CLI, Ember's command line interface, provides a standard project
structure, a set of development tools, and an addon system.
This allows Ember developers to focus on building apps rather
than building the support structures that make them run.
From your command line, a quick `ember --help` shows
the commands Ember CLI provides. For more information on a specific command,
type `ember help <command-name>`.

## Creating a New App

To create a new project using Ember CLI, use the `new` command. In preparation
for the tutorial in the next section, you can make an app called `super-rentals`.

```shell
ember new super-rentals
```

## Directory Structure

The `new` command generates a project structure with the following files and
directories:

```text
|--app
|--bower_components
|--config
|--dist
|--node_modules
|--public
|--tests
|--tmp
|--vendor

bower.json
ember-cli-build.js
package.json
README.md
testem.js
```

Let's take a look at the folders and files Ember CLI generates.

**app**: This is where folders and files for models, components, routes,
templates and styles are stored. The majority of your coding on an Ember
project happens in this folder.

**bower_components / bower.json**: Bower is a dependency management tool.
It is used in Ember CLI to manage front-end plugins and component dependencies
(HTML, CSS, JavaScript, etc).  All Bower components are installed in the
`bower_components` directory.  If we open `bower.json`, we see the list of
dependencies that are installed automatically including Ember, Ember
CLI Shims, and QUnit (for testing). If we add additional
front-end dependencies, such as Bootstrap, we will see them listed here, and
added to the `bower_components` directory.

**config**: The config directory contains the `environment.js` where you can
configure settings for your app.

**dist**: When we build our app for deployment, the output files will be created
here.

**node_modules / package.json**: This directory and file are from npm.
npm is the package manager for Node.js. Ember is built with Node and uses a
variety of Node.js modules for operation. The `package.json` file maintains the
list of current npm dependencies for the app.  Any Ember CLI
add-ons you install will also show up here. Packages listed in `package.json`
are installed in the node_modules directory.

**public**: This directory contains assets such as images and fonts.

**vendor**: This directory is where front-end dependencies (such as JavaScript
or CSS) that are not managed by Bower go.

**tests / testem.js**: Automated tests for our app go in the `tests` folder,
and Ember CLI's test runner **testem** is configured in `testem.js`.

**tmp**: Ember CLI temporary files live here.

**ember-cli-build.js**: This file describes how Ember CLI should build our app.

## ES6 Modules

If you take a look at `app/router.js`, you'll notice some syntax that may be
unfamiliar to you.

```app/router.js
import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
});

export default Router;
```

Ember CLI uses ECMAScript 2015 (ES2015 for short or previously known as ES6) modules to organize application
code.
For example, the line `import Ember from 'ember';` gives us access to the actual
Ember.js library as the variable `Ember`. And the `import config from
'./config/environment';` line gives us access to our app's configuration data
as the variable `config`. `const` is a way to declare a read-only variable, 
as to make sure it is not accidentally reassigned elsewhere. At the end of the file,
`export default Router;` makes the `Router` variable defined in this file available 
to other parts of the app.

## Upgrading Ember

Before continuing to the tutorial, make sure that you have the most recent
versions of Ember and Ember Data installed. If the version of `ember` in
`bower.json` is lower than the version number in the upper-left corner of these
Guides, update the version number in `bower.json` and then run `bower install`.
Similarly, if the version of `ember-data` in `package.json` is lower, update the
version number and then run `npm install`.

## The Development Server

Once we have a new project in place, we can confirm everything is working by
starting the Ember development server:

```shell
ember server
```

or, for short:

```shell
ember s
```

If we navigate to [`http://localhost:4200`](http://localhost:4200), we'll see the default welcome screen.
Once we add our own `app/templates/application.hbs` file, the welcome screen will be replaced with our own content.

![default welcome screen](../../images/ember-cli/default-welcome-page.png)
