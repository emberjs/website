If you are using a data library that supports the Ember Inspector such
as Ember Data, you can inspect your models by clicking on the `Data` menu.

When you open the Data tab, you will see a list of model types defined
in your application. Each model type has the number loaded records next
to it. You can click on one type to view all of its loaded records.

<img src="/guides/ember-inspector/images/data-screenshot.png" width="680"/>

### Inspecting Records

Each row in the list represents a record, with the first four attributes
as columns (just enough attributes to identify the record). To view all
of the attributes and more properties, click on the record and it will
open in the object inspector.

<img src="/guides/ember-inspector/images/data-object-inspector.png"
width="680"/>

### Record States and Filtering

The data tab is a real time representation of your application's store.
Any changes such as added records, modifications, or deleted records will
immediately be reflected in the data tab. Record attributes are also
bound.

New unsaved records are green.

<img src="/guides/ember-inspector/images/data-new-records.png"
width="680"/>

Modified unsaved records are blue.

<img src="/guides/ember-inspector/images/data-modified-records.png"
width="680"/>

You can filter records based on state by clicking on one of the pills
below:

<img src="/guides/ember-inspector/images/data-filtering.png" width="400" />

You can also filter records by entering a query in the search box.


### Building a Data Custom Adapter

If you have built your own data persistence library (as opposed to using Ember Data
for example), you can build a data dapter so you can inspect your models
using the data tab.

You can see the documentation for the data adapter
[here][data-adapter-docs].

You can also use [Ember Data's data adapter][ember-data-data-adapter] as an example.

[data-adapter-docs]: https://github.com/emberjs/ember.js/blob/3ac2fdb0b7373cbe9f3100bdb9035dd87a849f64/packages/ember-extension-support/lib/data_adapter.js
[ember-data-data-adapter]:https://github.com/emberjs/data/blob/d7988679590bff63f4d92c4b5ecab173bd624ebb/packages/ember-data/lib/system/debug/debug_adapter.js
