Installing Ember is *easy*! And our new install process includes *Ember CLI*, Ember's build tool

* State of the art asset management (including combining, minifying, and versioning)
* Built-in generators can help you create components, routes, and more (and their test cases!)
* A standard project layout. Working on other Ember apps is easy, they're organized similarly
* Native [JavaScript modules](http://jsmodules.io/) to keep your project organized
* A complete testing framework (unit tests, integration tests)
* Access to a growing ecosystem of [Ember Addons](http://www.emberaddons.com/). Add functionality to your app without writing a single line of code! They're already packaged up and ready to add to your app


## Installation

Installing Ember is done using [NPM](#toc_got-node-and-npm). While you're at it we recommend you to also install phantomjs (if you don't have it already). Ember CLI uses phantomjs to run tests from the command line (without the need for a browser to be open).

```bash
npm install -g ember-cli
npm install -g phantomjs
```

## Testing your installation

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

## Troubleshooting

### Got Node (and NPM)?

Node Package Manager (npm) comes bundled with node.js and makes installing easy.  If you're not sure if you have node.js installed, try running the following from your command line:

```bash
node --version
```

If the command works and you get back something like 0.10.x, you've already got it installed!

If you **don't** have it installed...

* Windows or Mac users [can simply download and run the installer](http://nodejs.org/download/).
* Linux users [can check out this great guide](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) by Joyent for install instructions.

Once you've got node.js installed, re-run the above ```node --version``` to verify your install.
