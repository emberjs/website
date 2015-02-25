To see a list of libraries you are using along with their versions,
click on the `Info` menu.

<img src="/guides/ember-inspector/images/info-screenshot.png" width="680"/>

### Registering a Library

If you would like to add your own application to the list, or
are a library author yourself, you can register it using:

```javascript
Ember.libraries.register(libraryName, libraryVersion);
```

#### Ember Cli

Ember CLI automatically adds your application's name and version to the list
thanks to the [ember-cli-app-version] addon.

[ember-cli-app-version]: https://github.com/embersherpa/ember-cli-app-version
