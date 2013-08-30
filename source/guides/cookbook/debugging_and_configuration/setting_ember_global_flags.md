## Problem
You want to control features of Ember by setting specified global flags like `Ember.LOG_BINDINGS`
or `Ember.LOG_VIEW_LOOKUPS`.

## Solution
Create a `window.ENV` with these properties set to the desired value before Ember is loaded.

## Discussion

`ENV` is a object with the standard environmental variables. You can define it before loading `Ember`
to control various configuration settings. For more information, visit [ENV](http://emberjs.com/api/#property_ENV) section.

Prior loading `Ember`, you can do this:
```html
<script>
  window.ENV = {
    LOG_VIEW_LOOKUPS: true,
    LOG_VERSION: false,
    LOG_ACTIVE_GENERATION: true
  }
</script>
<script src="ember.js"></script>
```

`Ember` will respect already defined `ENV` variable and assume them as its default properties.

After that, if you run your application, it's goind to use the ones on `window.ENV` and you don't have to pass
them directly to `Ember.Application.create()`.

Checkout [Debugging](http://emberjs.com/guides/understanding-ember/debugging/) section for more information.

## Example
<a class="jsbin-embed" href="http://jsbin.com/IlAqOkI/3/embed?html,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>