## Problem
Your application lives in a user's browser for long periods of time between full refreshes
but your code changes often. In order to keep users on the latest ui code compatible with
your server apis you want a simple way of letting the user know to refresh the app.

## Solution
Create an initializer that tracks all ajax responses and checks the latest app version
against the version they loaded. When the app version changes, present a notification
to the user.

```javascript
Ember.Application.initializer({
  name: 'appVersionInitializer',
  initialize: function(container) {
    var runningVersion = Ember.$('meta[name="app-version"]').attr('content');
    return Ember.$(document).ajaxSuccess(function(event, xhr, settings) {
      Ember.run(function() {
        var currentVersion = xhr.getResponseHeader('App-Version');
        if (currentVersion !== runningVersion) {
          container.lookup('controller:application').set('isNewVersionAvailable', true);
        }
      });
    });
  }
});

```

In application.handlebars you can choose to display a message to the user. For example,
the following will display a message requiring the user to reload the page.

```html
<div {{bindAttr class=":new-version-mask isNewVersionAvailable"}}></div>
<div {{bindAttr class=":new-version-message isNewVersionAvailable"}}>
  <div class="inner">
    <p>
      A new version of the app is available.
    </p>
    <button class="primary" {{action 'reload'}}>Get the Latest</button>
  </div>
</div>
```

The reload action could reside in your application controller or route.

```javascript
actions: {
  reload: function() {
    window.location.reload();
  }
}
```

This solution requires a couple of things to be done on the server. There are different
ways you might decide to differentiate application versions but a simple one is based on
the current git SHA. For a rails application you could return the git SHA as a header in
every xhr response by adding the following to your base application controller:

```ruby
  GIT_SHA ||= `git rev-parse HEAD`.chomp

  before_filter do
    headers['App-Version'] = GIT_SHA
    @app_version = GIT_SHA
  end
```

The add the following meta-tag to your application bootstrap html page.

```html
<meta name="app-version" content="<%= @app_version %>">
```

The details of this pattern would need to be adjusted depending on release frequency and how
intrusive this message may be for your users.

## Discussion


