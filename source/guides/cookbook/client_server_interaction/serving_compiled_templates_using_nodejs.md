##Problem
Ember.js uses Handlebars.js as its default templating language.  Handlebars files may be 
created directly in your HTML document as follows:
```html
<script type="text/x-handlebars" id="some-template">
  {{! your template goes here}}
</script>
```
When your Ember application uses one of these templates, it will need to compile that handlebars
syntax into a javascript function.  This takes a little bit of time and is a needless task for your
client to be performing.  Furthermore, as your application grows, having tons of these templates in
your HTML document will become unwieldy and ugly.


Thankfully, this compilation step can be done ahead of time.  Ember.js expects that your templates
will be found in a hash object called Ember.TEMPLATES.  You can prebuild this hash on your server
and send it down the wire with your application.

##Solution
###Disclaimer
This recipe assumes you have never used node, npm, or grunt in your project.  If you have used 
these before and already have a Gruntfile.js (or .coffee) in your project, some of the early 
steps can probably be skipped or read through quickly.

###Dependencies
1. Node.js - a javascript run-time powered by V8
2. NPM - a package manager for node modules with strong CLI tooling
3. Grunt.js - a task-runner for node.js
4. grunt-contrib-watch - a Grunt.js task for watching parts of your file system for changes
5. grunt-ember-templates - a Grunt.js task for compiling handlebars templates into Ember.TEMPLATES

###Process
All steps assume you are in your project's root.

####Setup
1. Install Node.js (which now ships with NPM).
2. Type ```npm init```.  This will ask you for a few quick details and then will output a 
package.json file.  This file contains a list of all your dependencies (and version number) and some
other details relevant to your project.
3. Type ```npm install --save-dev grunt grunt-cli grunt-ember-templates grunt-contrib-watch```.  This will install four packages from npm.  ```--save-dev``` tells npm to include these dependencies in
your package.json file under ```devDependencies```
4. Create ```Gruntfile.js``` in your project root.  This file contains all the configuration
for your grunt tasks.  
5. Open the Gruntfile and paste in the following code:


```js
'use strict'

module.exports = function (grunt) {
  
  grunt.initConfig({

    //define some mustache-style variables to use throughout Gruntfile
    templateDir: "path/to/directory",
    outputDir: "path/to/output",
    compiled: "nameOfCompiledFile.js",

    //configure out template precompilation task
    emberTemplates: {
      precompile: {
        options: {
          templateBasePath: "path/to/directory/" ,
          templateFileExtensions: /\.(hbs|hjs|handlebars)/
        },
        src: "<%= templateDir %>/**/*.{hbs,hjs,handlebars}",
        dest: "<%= outputDir %>/<%= compiled %>"
      }    
    },

    //configure our file watching task
    watch: {
      handlebars: {
        files: ["<%= templateDir %>/**/*.{hbs,hjs,handlebars}"],
        tasks: ["emberTemplates"],
        options: {
          livereload: true 
        }
      } 
    }
  });

  //load our tasks from NPM
  grunt.loadNpmTasks("grunt-ember-templates");
  grunt.loadNpmTasks("grunt-contrib-watch");

  //register CLI task that will precompile our templates
  grunt.registerTask("default", ["emberTemplates"]);

  //register CLI task that will watch our handlebars files and 
  //recompile them whenever they change (watch task blocks the process)
  grunt.registerTask("precompile-watch", ["emberTemplates", "watch"]);

};
```

####Code Overview
Gruntfiles are easy to read once you know what you are looking at.


The top declares three 
mustache.js-style variables that may be used to store directory names, filenames, etc and can
be used throughout your Gruntfile.  This is huge, as it allows you to easily change project structure
without hardcoding your paths throughout your config file.


The second two objects are configuration objects for the ```emberTemplates``` and ```watch``` tasks.
details on the options and configuration of these tasks is found in their respective github
repositories.  Grunt tasks typically have easily read README.md files that explain the options 
and configurations for that package.


The third section is where we register our tasks.  Grunt provides a convenient function 
```loadNpmTasks``` to load task definitions straight from the ```node_modules``` directory.
We also register two CLI tasks of our own, ```default``` and ```precompile-watch```.


Typing ```grunt``` at the terminal will run our default task which will compile our templates and
create a file in our specified output folder.  Typing ```grunt precompile-watch``` perform
the same compilation, but will also start a file watching process which monitors our template
directory for changes and re-runs the compilation task.


####Configuration and Testing
1. Now that you know what you are looking at, configure your Gruntfile by changing the paths 
at the top to match your project's layout.  
2. Test the precompilation with ```grunt``` and then test that your file watching task is working
by typing ```grunt precompile-watch``` and then saving one of your template files.
3. Fin.

##Discussion
Precompiling your templates is a must for Ember.js projects that grow beyond a trivial size.
The steps outlined here provide a convenient, configurable, and extensible way to perform this
important task and allow you to focus on developing your application.  The repository that this
tutorial is based on is found at http://www.github.com/stevekane/precompiled-template-recipe.


As a bonus, if you are interested in using ```Emblem.js``` which has a HAML-like syntax to 
build your templates, there is a grunt task for precompiling emblem.js templates called 
```grunt-emblem```.  The steps needed to configure this task are similar to the ones shown
but be sure to refer to the projects github repository for details.
