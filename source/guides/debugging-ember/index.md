## Observers

When your application becomes more complicated it will happen that a computed property doesn't appear to change. Verify by observing changes on that property. Adding an observer is very similar to a computed property:

```javascript
propertyObserver: function() {
  // Called when the value of property changes
}.observes('property');
```

## toString

The framework tries to be smart about turning an object into a string. However by default browsers will show you the object representation in the Javascript console. While this is often useful sometimes you just want to know what kind of object you're dealing with.

One option is to call toString on the object like so:

```javascript
applicationController.toString(); // "<App.ApplicationController:ember2366>"
```

 Another way that is less typing is to append "" like so:

```javascript
applicationController + "" // "<App.ApplicationController:ember2366>"
```

## Handlebars

Handlebars has two convenient helpers to aid in debugging. `{{log path.to.value}}` and `{{debugger}}` respectively log the value of the path or add a debugger statement at that location in your template. More information in the [handlebars helpers documentation](/api/classes/Ember.Handlebars.helpers.html).

## forEach

Ember.js by default exposes the `forEach` method on all array like objects. During debugging it can become annoying to have to keep stepping into forEach calls. Set a breakpoint inside your callback function and hit “continue”. If the array is not empty the debugger will immediately jump to your callback function. In Chrome you can also right click on the line and choose “Continue to here”. Note that the same works for any other callback as well. 
