# A Basic Guide to Ember Data's Basic Adapter

The Basic Adapter is one of the suite of built in Adapters provided as part of Ember Data, and is intended to provide a way for Ember Data to be used with any kind of JSON data, by delegating to a ```sync``` object on your model, which can then make the necessary ```$.ajax``` calls to perform the required operation. The Basic Adapter also provides a host of convieniences for handling and transforming the data loaded from a JSON source, but developers can implement and use their own if they wish. 

## Caveat Emptor: what the Basic Adapter does not do

The Basic Adapter does not implement any handlers for the [Model Lifecycle](http://emberjs.com/guides/models/model-lifecycle/) that the other Ember Data Adapters do. It is up to you to keep track of when to save your Model data and handle error conditions. You have to handle consistency yourself, i.e. a record may have been updated on the server since you loaded it and are about to save it again. 

## Pre-requisite Concepts

There are some things you should understand before embarking on a tour of Ember Data and the Basic Adapter. 

### The Four Basic Ember Data Attribute Types
Ember Data has built in support for four key attribute data types:

- ```String```
- ```Number```
- ```Boolean```
- ```Date```

The Basic Adapter supports all of these basic types. 

### Transforms in Basic Adapter

Transforms allow for a mapping to be defined that states how to serialize and de-serialize a non-core data type. For example, in the Basic Adapter, a simple ```date``` type could be registered as follows:

    ```javascript
    DS.registerTransforms('dateTransform', {
      date: {
        serialize: function(value) {
          return value.toString();
        },

        deserialize: function(string) {
          return new Date(string);
        }
      }
    });
    ```

This Transform says: 'For a type called ```date```, serialize it by calling ```toString()``` on its instance, and de-serialize it by constructing a new Date object from the passed string. 

The transform above now allows you to create a model for use with the Basic Adapter that has a type ```date``` attribute:

```javascript
    Person = DS.Model.extend({
      firstName: attr('string'),
      lastName: attr('string'),
      createdAt: attr('date')
    });
```

When Ember Data encounters the Person model, it will use the transform defined above to correctly serialize and de-serialize the type from the server JSON results. 

Transforms can be registered and used with any Ember Data Adapter. The Basic Adapter uses a built in 'Pass-Through' Transform for the three basic core types it supports. 

### Processors in Basic Adapter

Processors perform Transforms and a few related primary functions on one of the native collection types that Ember Data Basic Adapter understands: Objects, Arrays and HasMany. Basic Adapter has processors for all three.  

A Processor implements:

    - a method to 'camelize' the keys of the JSON packet representing the native type, 
    - a method to 'munge' the packet which allows a given function to act as an arbitrary Transformation and operate on the packet and return the results,     
    - a method to apply the registered transforms. 

## The Basic Adapter

At its core, the Basic Adapter implements the following methods:

    - find
    - findQuery
    - findHasMany
    - createRecord
    - updateRecord
    - deleteRecord

These methods in turn delegate calls to your Ember Data model, which has to implements a special ```sync``` object that it will delegate calls to. 

## Getting an Ember Data Model ready for Basic Adapter

As mentioned, the Basic Adapter expects that your Ember Data model implements a ```sync``` object which in turn implements all of the methods necessary to communicate to your data source or server. This allows you to implement custom ajax calls.

As a minimum, the Basic Adapter expects your Ember Data model to implement the following as methods on the ```sync``` object:

    - find
    - findQuery
    - findHasMany
    - createRecord
    - updateRecord
    - deleteRecord

Each of these methods are expected to take 

If your Ember Data model is composed of a HasMany relationship, and you want to query that relationship, the Basic Adapter looks for a method defined with the conventional name ```find<RelationshipName>```. For example, if an Ember Data model is defined with a HasMany relationship like so:

```javascript
    Person = DS.Model.extend({
      firstName: attr('string'),
      lastName: attr('string'),
      createdAt: attr('date')
    });

    PhoneNumber = DS.Model.extend({
      areaCode: attr('number'),
      number: attr('number'),
      person: belongsTo(Person)
    });

    Person.reopen({
      phoneNumbers: hasMany(PhoneNumber)
    });
```

And then in your code you perform:

```javascript
    Person.find(1).then(function(person) {
        return person.get('phoneNumbers');
    });
```

The Basic Adapter will attempt to call a method on the ```sync``` object on your Ember Data model called ```findPhoneNumbers```. 

## Examples of Basic Adapter in Use

Here's a Basic Adapter example of reading the Twitter time line for a user. It shows a thumbnail sketch of everything discussed above.

```javascript
    App.User = DS.Model.extend({
      defaultProfileImage: attr('boolean'),
      description: attr('string'),
      screenName: attr('string'),
      isVerified: attr('boolean'),
      createdAt: attr('date'),
      tweets: hasMany('App.Tweet')
    });

    App.Tweet = DS.Model.extend({
      coordinates: attr('point'),
      createdAt: attr('date'),
      isFavorited: attr('boolean'),
      retweetCount: attr('number'),
      text: attr('string'),
      isTruncated: attr('boolean'),

      replyTo: belongsTo('App.User'),
      user: belongsTo('App.User')
    });

    App.User.find(userId).then(function(user) {
      return user.get('tweets');
    }).then(function(tweets) {
      promise.resolve(tweets);
    });

    App.User.sync = {
      find: function(id, process) {
        $.getJSON("/users/show", { screen_name: id }).then(function(user) {        
          process(user)                 
            .primaryKey('screen_name')
            .camelizeKeys()
            .applyTransforms('twitter')
            .load();
        });
  }

      findTweets: function(user, name, process) {
        var screenName = user.get('id');

        $.getJSON("/statuses/user_timeline", { screen_name: screenName }).then(function(timeline) {
          process(timeline)
            .primaryKey('id_str')
            .camelizeKeys()
            .applyTransforms('twitter')
            .munge(function(json) {
              json.isTruncated = json.truncated;
              json.replyTo = json.inReplyToScreenName;
            })
            .load();
        });
      }
    };
```