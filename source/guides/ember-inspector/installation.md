The Ember Inspector extends browsers' developer tools to make understanding and debugging your Ember.js applications easier.

Steps to install the inspector for Google Chrome, Firefox, other
browsers (Bookmarklet), and apps running on mobile devices are explained
below.

### Google Chrome

You can install the Ember Inspector on Google Chrome as a new developer
tool panel.

Visit the extension page on the [Chrome Web Store][ember-inspector-chrome].

Click on "Add To Chrome":

<img src="/guides/ember-inspector/images/installation-chrome-store.png" width="680" />

Once installed, go to an Ember.js application, open the developer tools,
and click on the `Ember` tab next to the rest of the devtools panels.

<img src="/guides/ember-inspector/images/installation-chrome-panel.png" width="680">

[ember-inspector-chrome]: https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi

#### File:// protocol

If you need to use the inspector with the `file://` protocol.

Visit the URL: `chrome://extensions` and check the "Allow access to file URLs" checkbox:

<img src="/guides/ember-inspector/images/installation-chrome-file-urls.png" width="400">

#### Enable Tomster

You can configure a tomster icon to show up in Chrome's url bar whenever you are visiting a site that uses Ember.js.

Visit `chrome://extensions`.

Click on `Options`.

<img src="/guides/ember-inspector/images/installation-chrome-tomster.png" width="400">

Make sure the "Display the Tomster" checkbox is checked.

<img src="/guides/ember-inspector/images/installation-chrome-tomster-checkbox.png" width="400">


### Firefox

Visit the addon page on the [Mozilla Addons
site][ember-inspector-mozilla].

Click on "Add to Firefox".

<img src="/guides/ember-inspector/images/installation-firefox-store.png" width="680">

Once installed, go to an Ember.js application, open the developer tools,
and click on the `Ember` tab.

<img src="/guides/ember-inspector/images/installation-firefox-panel.png" width="680">

[ember-inspector-mozilla]: https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/


#### Enable Tomster

To enable the tomster to show up in the url bar whenever you are
visiting a site that uses Ember.js Ember.js visit `about:addons`.

Click on `Extensions` -> `Preferences`.

<img src="/guides/ember-inspector/images/installation-firefox-preferences.png" width="600">

Make sure the "Display the Tomster icon when a site runs Ember.js" checkbox is checked.

<img src="/guides/ember-inspector/images/installation-firefox-tomster-checkbox.png" width="400">


### Bookmarklet

If you are using any browser other than Chrome or Firefox, you can use the
bookmarklet option to use the inspector.

Add the following bookmark:

```
javascript: (function() { var s = document.createElement('script'); s.src = '//ember-extension.s3.amazonaws.com/dist_bookmarklet/load_inspector.js'; document.body.appendChild(s); }());
```

To open the inspector, just click on the bookmark.

Internet Explorer will open an iframe instead of a popup due to the lack of support for cross-origin messaging.

Safari blocks popups by default, so you'll need to enable popups before
using this option.


### Mobile Development

If you want to run the inspector with apps running on mobile devices,
you can use the [Ember Cli Remote Inspector][ember-cli-remote-inspector] addon.

[ember-cli-remote-inspector]: https://github.com/joostdevries/ember-cli-remote-inspector

