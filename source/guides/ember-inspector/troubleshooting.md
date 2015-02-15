Below are some common issues you may encounter, along with the necessary
steps to solve them. If your issue is not listed below, please submit an
issue to the inspector's [Github repo][ember-inspector-github].

### Ember Application Not Detected

If the inspector cannot detect an Ember application, you will see
the following message:

<img
src="/guides/ember-inspector/images/troubleshooting-application-not-detected.png" width="350">

Some of the reasons this happens:

- This is not an Ember application
- You are using an old Ember version ( < 1.0 ).
- You are using a protocol other than http or https. For file:// protocol,
follow [these steps](/guides/ember-inspector/installation#toc_file-protocol).
- The Ember application is inside a sandboxed iframe with no url (if you
  are using Jsbin, follow [these steps](#toc_using-the-inspector-with-jsbin).

#### Using the Inspector with Jsbin

Due to the way Jsbin uses iframes, the inspector doesn't work with edit
mode.

To use the inspector, switch to the "live preview" mode by clicking on the
arrow circled below.

<img src="/guides/ember-inspector/images/troubleshooting-jsbin.png" width="350">


### Application is not Detected Without Reload

If you always have to reload the application after you open the
inspector, that may mean your application's
booted state is corrupted. This happens if you are calling
`advanceReadiness` or `deferReadiness` after the application has
already booted.

### Data Adapter Not Detected

When you click on the Data tab, and see this message:

<img src="/guides/ember-inspector/images/troubleshooting-data-adapter.png" width="350">

It means that you are either not using a data persistence library
(such as Ember Data), or the library you're using does not support the
Ember Inspector.

If you are the library's author, [see this section](/guides/ember-inspector/data#toc_building-a-data-custom-adapter) on how to add Ember Inspector support.

### Promises Not Detected

You click on the Promises tab, and see this message:

<img src="/guides/ember-inspector/images/troubleshooting-promises-not-detected.png" width="350">

This happens if you are using a version of Ember < 1.3.

#### Missing Promises

If the Promises tab is working, but there are promises you can't find,
it's probably because these Promises were created before the
inspector is activated.

To start detecting promises the moment the app boots, click on the `Reload` button below:

<img src="/guides/ember-inspector/images/troubleshooting-promises-toolbar.png" width="350">

#### Inspector Version Old on Firefox

Firefox addons need to go through a review process before every update.
This causes the Firefox Ember Inspector to usually be one version
behind.

Unfortunately we don't have control over this process, so if you need
the latest inspector version, you will have to download and install the inspector
manually from [Github][ember-inspector-github].


[ember-inspector-github]: https://github.com/emberjs/ember-inspector
