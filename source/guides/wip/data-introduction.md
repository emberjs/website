# Getting Data Into Your App

Ember.js gives you the tools you need to keep your models synchronized
with your UI. That's great, but how do you get data into your models in
the first place?

To recap, Ember.js pages have a lifecycle that is designed to make it
easy to keep your data and URL in sync.

* When the user loads the application, Ember looks at the URL and
  invokes the `model` hooks in the Routes specified by your router
  definition.
* Ember then renders the templates for those routes, hooking up the
  model to the template.

* When a template uses `{{link-to 'route'}}`, Ember automatically
  generates a URL from the router definition.
* When the user clicks on the link, Ember renders the template for the
  route specified in the `link-to`. If any models were specified
  (`{{link-to 'post' post}}`), Ember will hook up the specified model to
  the template it renders.
* Also, when the user clicks on the link, Ember will update the URL.

> Insert Diagram Here

As far as Ember is concerned, you can return any JavaScript object from
the `model` hook, including a plain JavaScript object, so you can work
with raw JSON requests to your server if you want.

In practice, you will probably want more structure in your model layer,
and Ember Data provides additional features that may help you:

* Model objects that can contain additional computed properties and
  methods, rather than working directly with Plain Old JavaScript
  Objects.
* A built-in cache so that you can avoid making additional Ajax requests
  if the data you need is already available in memory.
* Flags on each model that you can use to determine whether a record is
  loading, saving, dirty, newly created, deleted, and more. You can use
  these flags to control the UI. For example, you may want to show some UI
  (a spinner) when a record is saving, or disable editing when it's
  saving.
* Automatic, efficient filters on your models that you can use to build
  live arrays that match conditions on each record. For example, you
  could build a live array that contained only `Person` records whose
  last name was "Lannister" or whose `isSaving` flag was true. The
  arrays are updated incrementally only when the properties change.
* Support for several different kinds of relationships. Relationships
  can be populated with an Array of IDs, a URL, or determined lazily
  based on information in the parent model.
* When relationships are specified by ID, avoiding additional fetches
  from the server for records that are already loaded.
* Support for saving records, and tracking what exactly has changed on
  your model object.
* Support for rolling back changes that the user made since the last
  fetch or save. This makes it easy to implement `cancel` buttons, for
  example.
* A well-defined separation between your model objects, how they are
  fetched from the server, how they are converted into the form
  expected by your application, and how they are saved back to the
  server.

In addition to these features, Ember Data comes with built-in support
for REST-like APIs. If your server's API is close to the API that the
`RESTAdapter` expects, you can avoid having to write explicit Ajax code
and serialization/deserialization logic.

Some features of the `RESTAdapter`:

* Automatically builds URLs for you based on the name of your model
  class.
* Automatically makes Ajax requests to the built URL, ensuring that the
  right headers are present and any data is serialized correctly.
* Handles payloads that contain multiple records at a time, so you can
  make a single HTTP request and get back multiple records.
* Handles server responses that embed models inside of other models.
* Handles "sideloading"&mdash;returning a normalized payload with all
  records grouped by type instead of embedded. This allows you to avoid
  duplicating records that are referenced by multiple other records
  (such as the author of a blog post&mdash;sideloading allows you to
  include the author of multiple posts one time in the payload).
* Allows pushing data embedded in the HTML using the same structure as
  your server's normal Ajax responses as an initial payload (to improve 
  performance).

Additionally, by using any Adapter (either by making your own Ajax
requests or using the built-in REST Adapter), you can prototype your
application using the Fixture Adapter and upgrade your models to use the
server when you're ready.

You can also make these decisions on a model-by-model basis. You might
have some models using raw Ajax in the `model` hook, some models using
the raw Adapter API, some models using the REST Adapter, and newer parts
of your application on fixtures.

The rest of the guides in this section walk you through how to use each
of these techniques, and go into more detail about when each one is
appropriate.
