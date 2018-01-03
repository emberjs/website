---
id: ember-template-compiler.deprecate-render-model
name: Model param in render helper
until: 3.0.0
since: 2.6
---

Using the model param in the `{{render` helper is deprecated in favor of using
components. Please refactor to a component and invoke thusly:

For example, if you had:

```handlebars
{{render 'foo-bar' someModel}}
```

```app/templates/foo-bar.hbs
<p>{{someProp}} template stuff here</p>
```

```app/controllers/foo-bar.js
export default Controller.extend({
  someProp: Ember.computed('model.yolo', function() {
    return this.get('model.yolo');
  })
});
```

Would be refactored to:

```handlebars
{{foo-bar model=someModel}}
```

```app/templates/components/foo-bar.hbs
<p>{{someProp}} template stuff here</p>
```

```app/components/foo-bar.js
export default Component.extend({
  someProp: Ember.computed('model.yolo', function() {
    return this.get('model.yolo');
  })
});
```

#### Legacy support addons

Ember provides addons [ember-legacy-views](https://github.com/emberjs/ember-legacy-views) and
[ember-legacy-controllers](https://github.com/emberjs/ember-legacy-controllers) that allow for projects to continue
using some legacy concepts in 2.x.
Beginning in 2.4, use of these addons is now deprecated.

See the deprecation guide sections on [removing views](http://emberjs.com/deprecations/v1.x/#toc_ember-view),
[`ArrayController`](http://emberjs.com/deprecations/v1.x/#toc_arraycontroller),
and [`ObjectController`](http://emberjs.com/deprecations/v1.x/#toc_objectcontroller)
for information on migration.

Once view and controller deprecations are removed, you can remove the addons with the command:
`npm uninstall --save-dev ember-legacy-views && npm uninstall ember-legacy-controllers`
