### Problem

You want to create a simple form and have bindings and actions work. In this case
we'll setup a login form.

### Solution

We want to have a form with an `email` and a `password`. We'll also have a 'Login' button
to submit that form.

The form might look something like this:

```html
<h3>Login</h3>

<form>
  <div class="group">
    <label for="login-email">Email</label>
    <input id="login-email" type="email" required="true" autofocus="true" placeholder="Email">
  </div>
  
  <div class="group">
    <label for="login-password">Password</label>
    <input id="login-password" type="password" required="true" placeholder="Password">
  </div>
  
  <button type="submit">Login</button>
</form>
```

Now we want to map the email field value to `email` and the password field value to `password`,
we'll end up with something like this:

```hbs
<h3>Login</h3>

<form>
  <div class="group">
    <label for="login-email">Email</label>
    {{input id='login-email' type='email' required='true'
      autofocus='true' placeholder='Email' value=email}}
  </div>
  
  <div class="group">
    <label for="login-password">Password</label>
    {{input id='login-password' type='password'
      required='true' placeholder='Password' value=password}}
  </div>
  
  <button type="submit">Login</button>
</form>
```

This will bind the values of those fields to the variables that we set for `value`. Now we need to handle
the submission. This will require setting up an action.

```hbs
<button type="submit" {{action 'login' email password}}>Login</button>
```

This might look like the best way to submit the form, but we can do better.

```hbs
<form {{action 'login' email password on='submit'}}>
  <!-- Our form here -->
</form>
```

Now well be able to submit the form with the Enter key and by clicking the 'Login' button. Although we've
setup an action in our template, we will get an error in the console if we try to submit our form:

>Uncaught Error: Nothing handled the action 'login'. If you did handle the action, this error can
be caused by returning true from an action handler in a controller, causing the action to bubble.

This is telling us that we need to create an action either in the controller, route, or the view.
We'll usually be creating actions in the controller or the route, mainly because it's more natural.
For this example we'll use the controller.

```js
App.LoginController = Ember.Controller.extend({
  actions: {
    login: function (email, password) {
      // access the bound variables
    }
  }
});
```

Notice that I've extended `Ember.Controller` instead of `Ember.ObjectController` or `Ember.ArrayController`,
this is because we aren't popluating our login controller with a model, so we avoid the headache of some errors
and having to set the `model` property even if we don't use it.

So, with our current setup, if we click 'Login' or hit the enter key after we've filled out all the fields (we use `required='true'`
so the form will complain and not submit if we have no data in the inputs) the result will be the calling
of that `login` action, and since we have yet to flesh it out, we'll get no result and no error. Let's put something in that `login` action:

```js
login: function (email, password) {
  ajax('/auth/login', {
    type: 'POST',
    data: {
      email: email,
      password: password
    }
  }).then(function (data) {
    console.log(data);
  }, function (error) {
    console.error(error);
  });
}
```

*Note: `ajax` is a wrapper around `Ember.$.ajax` which returns a real promise, you can find that [here][ajax-gist] or use
the note-worthy [ic-ajax].*

From here we can show an alert to the user, or transition somewhere. Let's add a message so that we can show if our login fails:

```hbs
<!-- Above the login form -->
{{#if loginError}}
  <p class="login-error">{{loginError}}</p>
{{/if}}
```

Now in our rejection handler we can set this value:

```js
login: function (email, password) {
  var self = this;

  // Reset our error if the user tries to login again
  this.set('loginError', undefined);

  ajax('/auth/login', {
    type: 'POST',
    data: {
      email: email,
      password: password
    }
  }).then(function (data) {
    console.log(data);
  }, function (error) {
    // Assuming `error` is a string
    self.set('loginError', error);
  });
}
```

All we have left is to save our user somewhere easily accessible, like the `ApplicationController`.
One issue that we'll have if we do that, is having to specify `needs: 'application'` in every controller that we want to use
the logged in user. We can solve this by injecting a simple session service into our routes and controllers.

```js
var SessionService = Ember.Object.extend({
  isLoggedIn: Ember.computed.notEmpty('user')
});

Ember.Application.initializer({
  name: 'session',

  initialize: function (container, application) {
    application.register('session:main', SessionService, { singleton: true });

    // Inject into all routes & controllers
    application.inject('controller', 'session', 'session:main');
    application.inject('route', 'session', 'session:main');
  }
});
```

*For more information on dependency injection, see [this][injection-guides] guide.*

With the session service injecten into all of our routes and controllers, we
can access the user with a simple `this.get('session.user')`, which means we can also
set the user and have it be accessable from anywhere that we care about. Lets do that now.

```js
login: function (email, password) {
  var self = this;

  // Reset our error if the user tries to login again
  this.set('loginError', undefined);

  ajax('/auth/login', {
    type: 'POST',
    data: {
      email: email,
      password: password
    }
  }).then(function (data) {
    self.set('session.user', data);
    self.transitionToRoute('index');
  }, function (error) {
    // Assuming `error` is a string
    self.set('loginError', error);
  });
}
```

We can do much more from here to improve our login, mainly a way to authenticate a route
if a user is logged in or not. This is an exercise I leave for you. You can get started
by sub-classing `Ember.Route` or writing a mixin, it really depends on how you plan to use it.

### Discussion

Authentication is a tricky thing and comes in many different flavors, but I hope that this
was more then just an exercise in setting up a simple authentication workflow. We went from
working with templates and forms, to handling our inputs with actions on the controller.
We also had a little lesson in setting up a simple service that we injected into where we needed it.

One thing I didn't mention, is the router. For this lesson the router looked like this:

```js
Router.map(function () {
  // 'index' route is available by default
  this.route('login');
});
```

This wired our `login.hbs` and `LoginController` together while creating a default route and view,
which we didn't need to override.

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/pojoho/1/embed?html,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

[injection-guides]: http://emberjs.com/guides/understanding-ember/dependency-injection-and-service-lookup/#toc_dependency-injection-with-code-register-inject-code
[ajax-gist]: https://gist.github.com/knownasilya/9472916
[ic-ajax]: https://github.com/instructure/ic-ajax
