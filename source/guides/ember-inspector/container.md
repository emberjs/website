Ember.js implements dependency injection by using a container.  Every Ember
application has a container that creates instances for you. You can
inspect these instances using the inspector's container tab.


<img src="/guides/ember-inspector/images/container-screenshot.png" width="680"/>

You will see a list of object types the container has cached. Click on
one type to see the list of all instances created by the container.

In our case, we are looking at the instantiated controllers.


### Inspecting Instances

Click on one row to inspect an instance using the object inspector.

<img src="/guides/ember-inspector/images/container-object-inspector.png" width="680"/>

To send an instance to the console, click to open the
object inspector, and then click on `$E` at the top right of the object inspector.

### Filter and Reload

You can reload the container tab by clicking on the reload icon.

To search for instances, type a query in the search box.

<img src="/guides/ember-inspector/images/container-toolbar.png" width="300"/>


