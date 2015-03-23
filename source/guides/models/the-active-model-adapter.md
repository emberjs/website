Ember comes with great support for integrating with rails' active-model-serializers. 

## Setup

### Ember
You need to tell ember to use both the ActiveModelAdapter and the ActiveModelSerializer.

```js
App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  
});

App.ApplicationSerializer = DS.ActiveModelSerializer.extend(App.EmbeddedRecordsMixin, {

});
```

### Rails
In your serializers you need to specify  couple of options:

```ruby
class ArchiveSerializer < ActiveModel::Serializer
  embed :ids, include: true
  ...
end
```

These tell active-model-serializers to generate json in the format that the ember adapter expects. 


## Serializing relationships from ember
By default the ActiveModelAdapter won't try to serialize any relationships. To tell it to include relationships you need to specify how they should be serialized.

Assuming the following models:

```js
App.Author = DS.Model.extend({
  name: DS.attr("string"),
  books: DS.hasMany('book')
});

App.Book = DS.Model.extend({
  name: DS.attr("string"),
  author: DS.belongsTo('author')
});
```

Let's tell the ActiveModelAdapter how to serialize an author

```js
App.AuthorSerializer = DS.ActiveModelSerializer.extend(App.EmbeddedRecordsMixin, {
  attrs: {
    books: { embedded: 'always' }
  }
});

```
The embedded: 'always' tells ember to serialize the books relationship whenever an author is saved. The json for serializing an author matches the rails conventions:

```js
{
  author: {
    name: "William Shakespeare"
    books_attributes: [
      { name: "Macbeth" },
      { name: "Richard III" }
    ]
  }
}
```
