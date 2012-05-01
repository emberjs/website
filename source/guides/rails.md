## Getting Started with Ember.js and Ruby on Rails

Before getting started with this guide, you should have the latest version of Ruby on Rails installed
(which is 3.2.3 at the time of writing). If you don't already have Ruby on Rails, you can follow
the instructions available on the [Rails website](http://rubyonrails.org/download).

In this guide, we'll show you how to build a simple, personal photoblog application using Ember.js and Ruby on Rails.

### Concepts

Ember.js is a front-end javascript model-view-controller framework. It is designed to help you create ambitious web applications which run inside the browser. These applications can use AJAX as their primary mechanism for communicating with an API, much like a desktop or mobile application.

Ruby on Rails is a Ruby-based full stack web framework. It also uses a model-view-controller paradigm to architect applications built on top of it, but in a much different way than Ember.js. The differences are beyond the scope of this guide, but you can read about them in [Gregory Moeck's excellent "Sproutcore MVC vs Rails MVC"](http://gmoeck.github.com/2011/03/10/sproutcore-mvc-vs-rails-mvc.html). What is critical to understand is that Ruby on Rails runs on the server, not the client, and is an excellent platform to build websites and APIs.

In the next few steps, we'll create a Ruby on Rails application which does two distinct but equally important things: It acts as a host for the Ember.js application we will write, and it acts as an API with which the application will communicate. 

It's worth noting that it's not at all necessary to host an Ember.js application using Ruby on Rails. It can be served from any standard web server (or a local file.)


### Creating a New Project

Use the `rails` command to generate a new project:

```
rails new photoblog -m http://emberjs.com/template.rb
```

The -m option specifies a template on which to base your new project. We have provided one for Ember.js apps which does the following:

* Loads the ember-rails and active_model_serializers gems
* Runs `bundle install`
* Generates an appropriate ember directory structure inside app/assets/javascripts/ember
* Generates an AssetsController and supplies an appropriate route in order to serve your application
* Generates an appropirate ApplicationSerializer for your applications data models.
  
When rails has finished creating your application it will reside in the `photoblog` directory. Switch to this newly created directory:

```
cd photoblog
```

### Creating the Server-side Models

This part will be familiar to anyone who has done Ruby on Rails development before. We'll create two new models, Photo and Comment. We start by asking Rails to generate the scaffolding for a Photo object.

```
rails generate scaffold Photo title:string url:string
```

Rails will generate a database migration, model, controller, resource routes, and other helpful files for us to start using. It will actually create more than we need: By default, rails scaffolding will generate standard CRUD (Create/Retrieve/Update/Destroy) views for our new model. Since our Ember.js application is going to be providing these views, we can safely remove them.

```
rm -rf app/views/photos
```

We should also ask Rails to generate our comment object and remove its views as well.

```
rails generate scaffold Comment text:string
rm -rf app/views/comments
```

We should now describe the accessible fields and the relationship of our models to Rails. In app/models/photo.rb, add the appropriate lines below:


```ruby
class Photo < ActiveRecord::Base
  attr_accessible :title, :url
  has_many :comments
end
```

And in app/models/comment.rb:

```ruby
class Comment < ActiveRecord::Base
  attr_accessible :text, :photo_id
  belongs_to :photo
end
```

If we look inside `db/migrate`, you'll see the database migrations that have been generated for us. We'll need to modify the `<datetime>_create_comments.rb` file to reference our photo model. 

```ruby
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :text
      t.references :photo

      t.timestamps
    end
  end
end
```

We can now run `rake db:migrate` to run these migrations and set up our database.

```
→ rake db:migrate
==  CreatePhotos: migrating ===================================================
-- create_table(:photos)
   -> 0.0184s
==  CreatePhotos: migrated (0.0185s) ==========================================

==  CreateComments: migrating =================================================
-- create_table(:comments)
   -> 0.0015s
==  CreateComments: migrated (0.0016s) ========================================
```

Our server-side models are now setup and ready for use!

### Creating our Client-side Models

Now that we have models set up to persist our data on the server, we need to describe them to Ember. ember-rails, included with our project template, provides generators to help us with this.

```
rails generate ember:model Photo title:string url:string
```

```
rails generate ember:model Comment text:string
```

This creates the appropriate Ember.js models in `app/assets/javascripts/ember/models`. We'll need to describe the relationship between them by hand. To do this, we can use `DS.hasMany` and `DS.belongsTo`. We pass string which represent the path of the model class, in this case, `Photoblog.Comment` and `Photoblog.Photo`, respectively.

```js
Photoblog.Photo = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  comments: DS.hasMany('Photoblog.Comment')
});
```

```js
Photoblog.Comment = DS.Model.extend({
  text: DS.attr('string'),
  photo: DS.belongsTo('Photoblog.Photo')
});
```



### Creating our Client-side Controller

Controllers serve as a mediator between your views and models. You can create a new controller using the `ember:controller` generator.

If your controller will be representing multiple objects, you should create an `Ember.ArrayController`. Let's create a new array controller to manage our photos by invoking the generator with the `--array` option:

```
rails generate ember:controller photos --array
```

This will generate a new array controller called `Photoblog.photosController` inside the `app/assets/javascripts/ember/controllers/photos_controller.js` file. Note that this file also creates a class called `Photoblog.PhotosController`. This allows you to easily create new instances of the controller for unit testing without having to reset singletons to their original state.


### Troubleshooting

We'll update this page with common issues as they come up. In the mean time, see our [Ember.js community](/community) page for more info on how to get help.
