Ember comes with a toolchain called Ember CLI that provides everything you need while developing your app behind a single command:  ```ember```.

* State of the art asset management (use ```ember build``` to build your entire project)
* Quick scaffolding like ```ember generate route some-page```
* ES6 modules to keep your project organized
* A complete testing framework ( ```ember test``` )
* Addons to share or use libraries from other Ember developers

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
