Our community has developed a plug-in to make development and debugging with Ember easier.

##What does the inspector plug-in do?
Once you install the plug-in, you'll get a new tab in the developer tools for your browser. This will contain lots of great information about the app you're viewing.

1. View all of the routes defined in your application.
2. Reference Ember's naming conventions for your URLs, including what to name your controllers, templates, routes and more.
3. Overlay your application with information about what templates, controllers, and models are currently being rendered.
4. Inspect the objects in your application, such as models and controllers, with UI that fully supports Ember features such as bindings and computed properties.
5. Make your application's objects available in the console as the $E variable.
6. If you're using Ember Data, see all of the records that have been loaded.


##Installing on Chrome or FireFox
Installing the pre-packaged plug-in is quick and painless:

* [Click here to install the add-on for FireFox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
* [Click here to install plug-in for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)

Once installed, hit F12 to pop open your developer tools and confirm you have a new tab "Ember".

*NOTE: If you open the tools after the page is loaded, you may have to refresh the page.*


##My browser isn't supported
If you're using IE or another browser that doesn't natively have support for the Ember Inspector, don't worry: you can use it as a "Bookmarklet"!

Save a bookmark for any page (like this page) to somewhere convenient (like your favorites bar) then let's edit it. For the URL, paste in the following JavaScript:

```js
javascript:(function() { var s = document.createElement('script'); s.src = '//ember-extension.s3.amazonaws.com/dist_bookmarklet/load_inspector.js'; document.body.appendChild(s); }());
```

Anytime you want to pull up the inspector, you just click the bookmark you just created and it'll pop open the inspector at the bottom of your screen.

*NOTE: IE will open an iframe instead of a popup due to the lack of support for cross-origin messaging.*


##Where can I get more info?
For more detailed info, [check out the GitHub repo](https://github.com/emberjs/ember-inspector).