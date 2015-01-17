Ember.js has been around for a few years. While folks might shoehorn the framework into each of their apps differently, there's been enough wheel re-inventions that our community has put together some best practices in the form of a tool, *Ember CLI*.

Our goal is to give you a rock solid foundation so that you can spend your time focusing on your app.

##Helping to organize your project
Ember CLI is a standardized tool; once you learn it, jumping into other projects is easy. When you find project on GitHub or via your favorite search engine, you'll already be familiar with the layout and foundation for the app because it's always going to be similar.

Here are some of the things Ember CLI will do for you:

* Lays down the folders, basic structure, and common files for your project in a standard way. *Every project which uses Ember CLI will be organized roughly the same*.
* Configures your project with common jshint settings so you can get meaningful warnings and errors about your code. *Quality is important*!
* Installs Ember.js and its dependencies for you. *You don't have to worry about what you need to download and staying up to date is easy*.
* Handles each of your objects (route, component, etc) as modules so you're not stuck hand-making AMD modules out of your code.

##Creating a standard for asset compilation
Every web project has a "pipeline" or set of steps for processing assets (JavaScript/CSS/etc). It usually looks something like this:

1. Compile the assets; for example, running your JavaScript through an optimizer like r.js; processing Sass or LESS into CSS
2. Combining and minifying your files
3. Creating a unique name / version for your files, to force clients to re-fetch your content if it's hosted on a delivery network

There's a great reason for having a pipeline like this. Fewer and smaller downloads means your users will have a much better experience. The bad news is that typically every project has it's own custom pipeline; do you pick Grunt or another project or write your own tool? Is your setup easy to maintain?

Ember CLI hopes to solve this problem by providing a setup to handle all of your assets using a tool called *Broccoli*. There's a single file you edit, your Brocfile, where you can declare your assets and handle their processing. You can customize this process to fit all of your needs and folks will know to look at your Brocfile to understand the processing.

Having a standard helps onboard folks quicker *so they can focus on contributing to your project*, rather than learning how a non-standardized build process works.

##Helping to modularize and organize your code
While you can already break your code into modules using libraries like RequireJS, Ember CLI provides the *ES6 standard* syntax for modules. This important feature helps organize your routes, components, views and more into distinct modules. The Ember resolver will know what packages to look for based on the naming of the files and what folder they live in (app/route, app/components, etc).

##Access to a massive library of code
Having a standard for your project gives us another great advantage: being able to leverage other people's work. [emberaddons.com](http://www.emberaddons.com/) indexes over 400 add-ons you can easy install on top of your Ember CLI installation. Why spend time writing something that someone's already finished? Jump on there and search, you can piece something powerful together quickly.