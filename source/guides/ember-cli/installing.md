## Got Node (and NPM)?

If you're not sure if you have node.js installed, try running the following from your command line:

```bash
node --version
```

If the command works and you get back something like 0.10.x, you've already got it installed!

If you **don't** have it installed...

* Windows or Mac users [can simply download and run the installer](http://nodejs.org/download/).
* Linux users [can check out this great guide](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) by Joyent for install instructions.

Once you've got node.js installed, re-run the above ```node --version``` to verify your install.


## Installing Ember

Node Package Manager (npm) comes bundled with node.js and makes installing easy.

Let's install Ember by running the following:

```bash
npm install -g ember-cli
npm install -g phantomjs
```

* Installing ```ember-cli``` will give you access to all the global ```ember``` commands, like...
  * ```ember new my-app``` to create a new project "my-app".
  * ```ember server``` to run your app locally.
  * ```ember test``` to run your tests (they're optional, but testing is great practice!)
* [PhantomJS](http://phantomjs.org/) is a headless (no GUI) web browser that Ember uses for integration tests.


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

* Permissions issues doing the npm install?
  * If you're on Mac or Linux, try using sudo (```sudo npm install -g ember-cli```).
  * Windows users can [open a shell with admin access](https://technet.microsoft.com/en-us/library/cc947813.aspx).
