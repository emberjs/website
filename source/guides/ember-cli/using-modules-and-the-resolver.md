Rather than use AMD (Require.js) or CommonJS (Browserify) modules, apps built using Ember CLI use ES6 modules through the [ES6 module transpiler](https://github.com/square/es6-module-transpiler). This means that you can build your apps using syntax from future JavaScript versions, but output AMD modules that can be used by existing JavaScript libraries today.

If you’ve built Ember.js apps before, you’re probably used to stuffing everything into a global namespace, following naming conventions so the app can automatically resolve its dependencies: `App.FooRoute` would know to render `App.FooView` by default. Using the custom resolver, Ember CLI applications have similar abilities, but using ES6 modules instead of a global namespace.

For example, this route definition in `app/routes/index.js`:

```javascript
import Ember from "ember";

var IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', blue'];
  }
});

export default IndexRoute;
```

Would result in a module called `routes/index`. Using the resolver, when Ember looks up the index route, it will find this module and use the object that it exports.

You can also export directly, i.e., without having to declare a variable:

```javascript
import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
```

Of course, while automatic resolving is awesome, you can always manually require dependencies with the following syntax:

1 import FooMixin from "./mixins/foo";

Which will load the default export (aliased as FooMixin) from ./mixins/foo.js.

If you like you can also use an absolute path to reference a module. But keep in mind that using relative paths is considered best practice for accessing modules within the same package. To reference a module using an absolute path begin the path with the name defined in package.json:

1 import FooMixin from "appname/mixins/foo";

Note, that the name of the variable used in the exported module doesn’t have any influence on the resolver. It’s the filename that is used to resolve modules. Similarly, you can give any name to the variable into which you import a module when doing so manually; see how the module mixins/foo is assigned to variable FooMixin in the example above. 

To use Ember or DS (for Ember Data) in your modules you must import them:

1 import Ember from "ember";
2 import DS from "ember-data";

Cyclic dependencies – are not yet supported at the moment, we are depending on es6-module-transpiler/pull/126

##Module Directory Naming Structure


Folder | Purpose
------ | -------
app/adapters/ Adapters with the convention adapter-name.js. 
app/components/ Components with the convention component-name.js. Components must have a dash in their name. So blog-post is an acceptable name, but post is not. 
app/controllers/ Controllers with the convention controller-name.js. Child controllers are defined in sub-directories, parent/child.js. 
app/helpers/ Helpers with the convention helper-name.js. Remember that you must register your helpers by exporting makeBoundHelper or calling registerBoundHelper explicitly. 
app/initializers/ Initializers with the convention initializer-name.js. Initializers are loaded automatically. 
app/mixins/ Mixins with the convention mixin-name.js. 
app/models/ Models with the convention model-name.js. 
app/routes/ Routes with the convention route-name.js. Child routes are defined in sub-directories, parent/child.js. To provide a custom implementation for generated routes (equivalent to App.Route when using globals), use app/routes/basic.js. 
app/serializers/ Serializers for your models or adapter, where model-name.js or adapter-name.js. 
app/transforms/ Transforms for custom Ember Data attributes, where attribute-name.js is the new attribute. 
app/utils/ Utility modules with the convention utility-name.js. 
app/views/ Views with the convention view-name.js. Sub-directories can be used for organization. 

All modules in the app folder can be loaded by the resolver but typically classes such as mixins and utils should be loaded manually with an import statement. For more information, see Naming Conventions.

##Resolving from template helpers

Ember has several template helpers that are used to easily resolve and render views and their contexts within a template. The resolver works with these helpers, too:


Template Helper

Example

Purpose


partial {{partial "foo"}} Renders the template within templates/foo.hbs 
view {{view "foo"}} Renders the view within views/foo.js 
render {{render "foo" <context>}} Renders the view within views/foo.js using the controller within controllers/foo.js and the template templates/foo.hbs 

##Resolving Handlebars helpers

Custom Handlebars helpers are one of the ways that you can use the same HTML multiple times in your web application. Registering your custom helper allows it to be invoked from any of your Handlebars templates. Custom helpers are located under app/helpers. If your custom helper contains a dash(upper-case, reverse-word, etc.), it will be found and loaded automatically by the resolver.

```javascript
// app/helpers/upper-case.js
import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  return value.toUpperCase();
});
```

In some-template.hbs:

```handlebars
{{upper-case "foo"}}
```

Limiting automatically-loaded helpers to those that contain dashes is an explicit decision made by Ember. It helps disambiguate properties from helpers, and helps mitigate the performance hit of helper resolution for all bindings. The other loading option is to define only the function used by the helper and to load it explicitly:

```javascript
// app/helpers/trim.js
export default function(value, options) {
  return value.trim();
};

// app.js
import Ember from "ember";
import trimHelper from './helpers/trim';

Ember.Handlebars.registerBoundHelper('trim', trimHelper);
```

In some-template.hbs:

```handlebars
{{trim "     foo"}}
```

In this example the helper is loaded explicitly. It’s the first argument to registerBoundHelper which makes the Handlebars renderer find it. The file name (trim.js) and the name of the variable it’s been imported into (trimHelper) could have been anything.

A common pattern with helpers is to define a helper to use your views (e.g. for a custom text field view, MyTextField a helper my-text-field to use it). It is advised to leverage Components instead. More concretely, instead of:

```javascript
// app/views/my-text-field.js
import Ember from "ember";
export default Ember.TextField.extend({
  // some custom behaviour
});

// app/helpers/my-text-field.js... the below does not work!!!
import Ember from "ember";
import MyTextField from 'my-app/views/my-text-field';

Ember.Handlebars.helper('my-text-field', MyTextField);
```

Do this:

```javascript
// Given... app/components/my-text-field.js
import Ember from "ember";

export default Ember.TextField.extend({
  // some custom behaviour...
});
```

##Using global variables or external scripts

If you want to use external libraries that write to a global namespace (e.g. moment.js), you need to add those to the predef section of your project’s .jshintrc file and set its value to true. If you use the lib in tests, you need to add it to your tests/.jshintrc file, too.

##Module import validation

To prevent errors in import statements from reaching production, this project uses grunt-es6-import-validate. This task parses each module file’s export and import statements and verifies that what is being imported is actually exported by the referenced module.

If you are referencing a vendor module that is defined outside of the app folder you may have to add it to the whitelist in tasks/options/validate-imports.js.
