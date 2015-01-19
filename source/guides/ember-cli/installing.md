##Got Node?

If you're not sure if you have node.js installed, try running the following from your command line:

```bash
node --version
```

If the command works and you get back something like 0.10.x, you've already got it installed!

If you **don't** have it installed...

* Windows or Mac users [can simply download and run the installer](http://nodejs.org/download/).
* Linux users [can check out this great guide](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) by Joyent for install instructions.

Once you've got node.js installed, re-run the above ```node --version``` to verify the install.


##Installing Ember CLI

Having node.js installed lets you use the Node Package Manager which makes installing easy.

Let's install Ember CLI and its dependencies (globally) by running the following:

```bash
npm install -g ember-cli
npm install -g bower
npm install -g phantomjs
```

A quick rundown on what those are:

1. Ember CLI is the toolset that you'll use for developing your Ember.js application
2. [Bower](http://bower.io/) is a package manager that Ember CLI uses to manage its versions of Ember, jQuery, QUnit, and more.
3. [PhantomJS](http://phantomjs.org/) is a headless web browser that Ember CLI uses for integration tests.


##Testing your installation

At this point, you should be good to go... but we can test out your install to make sure everything works great.

Let's run the generator for your project:

```bash
ember new my-app
```

This will create a new `my-app` folder and generate an application structure for you.

Once the generation process finishes, let's verify that we can launch the newly created app:

```bash
cd my-app
ember server
```

navigate to `http://localhost:4200` to see your new app in action.
