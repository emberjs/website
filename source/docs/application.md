## Creating a Namespace

Every Ember app should have an instance of `Ember.Application`. This object
will serve as the globally-accessible namespace for all of the other classes
and instances in your app. Additionally, it sets up event listeners on the page
so that your views receive events when users interact with your user interface
(which you'll learn about later.)

Here's an example of an application:

<pre class="brush: js;">
window.App = Ember.Application.create();
</pre>

You can call your namespace whatever you'd like, but it must begin
with a capital letter in order for bindings to find it.

If you are embedding an Ember application into an existing site, you can
have event listeners set up for a specific element by providing a `rootElement` property:

<pre class="brush: js; highlight: 2;">
window.App = Ember.Application.create({
  rootElement: '#sidebar'
});
</pre>
