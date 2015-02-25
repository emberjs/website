As part of making your app upgrades as smooth as possible, the
Ember Inspector gathers deprecations, groups them, and displays them in a
way that helps in tackling them.

To view the list of deprecations, click on the `Deprecations` menu.

<img src="/guides/ember-inspector/images/deprecations-screenshot.png" width="680"/>

You can see the total number of deprecations next to the `Deprecations` menu.
You can also see the number of occurences for each deprecation.

### Ember Cli Deprecation Sources

If you are using Ember Cli and have source maps enabled, you can see a
list of sources for each deprecation. In Chrome and Firefox devtools,
clicking on that source file will open the sources panel and take you to
the code that caused the deprecation message.

<img src="/guides/ember-inspector/images/deprecations-source.png" />

<img src="/guides/ember-inspector/images/deprecations-sources-panel.png" width="550"/>

You can send the entire stack trace of the deprecation message to the
console by clickng on `Trace in the console`.


### Transition Plans

For information on how to remove the deprecation warning,
click on the "Transition Plan" link to go to a helpful guide on how to
upgrade on the Ember.js website.

<img src="/guides/ember-inspector/images/deprecations-transition-plan.png" width="680" />


### Filtering and Clearing

You can filter the deprecations by typing a query in the search box.
You can also clear the current deprecations by clicking on the clear icon
at the top.

<img src="/guides/ember-inspector/images/deprecations-toolbar.png"
width="300"/>
