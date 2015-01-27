Ember CLI has become a major part of the Ember experience.

*There's a lot you're missing out on if you or your team aren't using it!*

## Helping to organize your project
Ember CLI is a standardized tool; once you learn it, jumping into other projects is easy because they're always going to be similar.

* Lays down the folders, basic structure, and common files for your project in a standard way. *Every project which uses Ember CLI will be organized roughly the same*.
* Configures your project with common jshint settings so you can get meaningful warnings and errors about your code. *Quality is important*!
* Installs Ember.js and its dependencies for you. *You don't have to worry about what you need to download and staying up to date is easy*.
* Handles each of your objects (route, component, etc) as modules so you're not stuck hand-making AMD modules out of your code.


## Standardizing asset compilation and modules
Every web project has its own "pipeline" or set of steps for processing assets (JavaScript/CSS/etc). It usually looks something like this:

1. Compile the assets; ex: running your JavaScript through an optimizer like r.js; processing Sass or LESS into CSS
2. Combining and minifying your files
3. Creating a unique name / version for your files, to force clients to re-fetch your content if it's hosted on a delivery network

Ember CLI standardizes and ties these steps together with a tool called Broccoli. There's a single file you edit, your Brocfile, where you can declare your assets and handle their processing.

While you can already break your code into modules using libraries like RequireJS, Ember CLI provides a way to use the *ES6 standard* syntax for modules. The Ember resolver will know what packages to look for based on the naming of the files and what folder they live in (app/route, app/components, etc).


## Access to a massive library of code
Having a standard for your project layout has another great advantage: being able to leverage other people's work. [emberaddons.com](http://www.emberaddons.com/) indexes hundreds of add-ons you can easy install on top of your Ember CLI installation. Need to add [Bootstrap](https://www.npmjs.com/package/ember-cli-bootstrap) or [Font Awesome](https://www.npmjs.com/package/ember-cli-font-awesome) to your project? They're already packaged up and ready to add to your app!