# THIS GUIDE IS NOT YET FUNCTIONAL OR COMPLETE
# PLEASE DO NOT USE

## Getting Started with Ember.js and Ruby on Rails

Before getting started with this guide, you should have the latest version of Ruby on Rails installed (which is 3.2.3 at the time of writing). If you don't already have Ruby on Rails, you can follow the instructions available on the [Rails website](http://rubyonrails.org/download).

In this guide, we'll show you how to build a simple, personal photoblog application using Ember.js and Ruby on Rails.

### Concepts

Ember.js is a front-end javascript model-view-controller framework. It is designed to help you create ambitious web applications which run inside the browser. These applications can use AJAX as their primary mechanism for communicating with an API, much like a desktop or mobile application.

Ruby on Rails is a Ruby-based full stack web framework. It also uses a model-view-controller paradigm to architect applications built on top of it, but in a much different way than Ember.js. The differences are beyond the scope of this guide, but you can read about them in our [Ember MVC guide](/guides/ember_mvc/). What is critical to understand is that Ruby on Rails runs on the server, not the client. It is an excellent platform to build websites and APIs.

In the next few steps, we'll create a Ruby on Rails application which does two distinct but equally important things: It acts as a host for the Ember.js application we will write, and it acts as an API with which the application will communicate. 

It's worth noting that it's not at all necessary to host an Ember.js application using Ruby on Rails. It can be served from any standard web server (or a local file.)


### Creating a New Project

Use the `rails` command to generate a new project:

```
rails new photoblog -m http://emberjs.com/template.rb
```

The -m option specifies a template on which to base your new project. We have provided one for Ember.js apps which does the following:

* Loads the `ember-rails` and `active_model_serializers` gems
* Runs `bundle install`
* Generates an appropriate directory structure inside `app/assets/javascripts/`
* Generates an `AssetsController` and supplies an appropriate route in order to serve your application
* Generates an appropirate `ApplicationSerializer` for Ember.js' RESTAdapter.
  
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

Our server-side models are now setup and ready for use! What we've done here is basically create a  API server that allows basic CRUD actions for our photo and comment models.

### Creating our Client-side Models

Now that we have models set up to persist our data on the server, we need to describe them to Ember. ember-rails, included with our project template, provides generators to help us with this.

```
rails generate ember:model Photo title:string url:string
```

```
rails generate ember:model Comment text:string
```

This creates the appropriate Ember.js models in `app/assets/javascripts/models`. We'll need to describe the relationship between them by hand. To do this, we can use `DS.hasMany` and `DS.belongsTo`. We pass string which represent the path of the model class, in this case, `Photoblog.Comment` and `Photoblog.Photo`, respectively.

```javascript
Photoblog.Photo = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  comments: DS.hasMany('Photoblog.Comment')
});
```

```javascript
Photoblog.Comment = DS.Model.extend({
  text: DS.attr('string'),
  photo: DS.belongsTo('Photoblog.Photo')
});
```

That's it! ember-data now knows about the structure of our data.

### Setting up the State Manager

Our Ember.js application will be managed by a state manager. The state manger handles what view is currently being displayed, as well as some other application login. Our default template will have created one for us at `app/assets/javascripts/states/app_states.js`. We'll want to modify it to look like this:

```javascript
Photoblog.StateManager = Ember.StateManager.extend({
  initialState: 'start',

  states: {
    start: Ember.State.extend({
      ready: function(manager) {
        var store = DS.Store.create({
          adapter: DS.RESTAdapter.create(),
          revision: 4
        });

        manager.set('store', store);
		
        var photos = store.find(Photoblog.Photo);
        manager.photosController.set('model', photos);

        store.adapter.mappings = {
          comments: Photoblog.Comment
        };
		
        manager.goToState('photos');
      }
    }),
	
    photos: Ember.State.create({
      initialState: 'index',

      index: Ember.State.create({
        view: function() {
          return Photoblog.IndexView.create()
        }.property()
      })
	  
    }) // End Photos state
	
  } // End States
  
});
```

Here, we're defining a state manager for our application. We set up our states object and include two states, `start` and `photos`. `start` is set as the initial state, and it handles only one event, called `ready`. In `ready`, it creates and configures our data store, and then it goes to the `photos` state. The `photos` state itself has a single substate, called `index`. This state is set as the initial substate for the `photos` parent state. The `index` substate has a single property, called 'view' which we are going to set to a new `Photoblog.IndexView`, which will show an index of all our photos. We haven't written that yet, so lets do that.

### Creating the Index View

To see all our photos, we need an write an index view which shows them.  We have a generator that will help us with this.

```
rails generate ember:view index photos
```

Note that we pass two additional arguments after 'ember:view', `index` and `photos`. `index` specifies the name of the view, and `photos` specifies the name of the owning controller. We'll get to that in the next step. 

Our generator creates two new files, one at `app/assets/javascripts/templates/photos/index.handlebars` and one at `app/assets/javascripts/views/photos/index_view.js`. First, let's look at the the `app/assets/javascripts/views/photos/index_view.js`.

```javascript
Photoblog.IndexView = Ember.View.extend({
  templateName: 'photos/index',
  controller: Photoblog.photosController
});
```

This is where we define the Ember.js object which manages the view. We simply provide it with a `templateName` property, which points to our handlebars template, and a `controller` property, which manages the view. Here's the template that defines what the index view looks like. Make yours look like the following:

```handlebars
<h1>My Photoblog</h1>

{{#each controller}}
  {{#view}}
    <div class="photo">
      <h2>{{title}}</h2>
      <img {{bind-attr src="url"}}>
      <br>
      {{#if comments.length}}
        <h3>Comments</h3>
        <ul>
          {{#each comments}}
            <li>{{text}}</li>
          {{/each}}
        </ul>
      {{/if}}
    </div>
  {{/view}}
{{/each}}
```

Let's go break this down and explain what's gong on.

```handlebars
<h1>My Photoblog</h1>

{{#each controller}}
```

Our view has a controller, the Photoblog.photosController, which will create in the next step. This is an Ember.ArrayController, so it implements the Ember.Enumerable interface. This means that we can loop over its contents (each element of the array) using the `#each` Handlebars expression.

```handlebars
{{#view}}
```

For each photo managed by the photosController, we will create a subview with the following contents. The `{{#view}}` helper doesn't change context, so it's not necessary to set any bindings.

```handlebars
    <div class="photo">
      <h2>{{title}}</h2>
      <img {{bind-attr src="url"}}>
      <br>
```

Here, we reference our photo to get its title, and user bind-attr to set the `<img>` tag's `src` attribute to the photo's url.

```handlebars
      {{#if comments.length}}
        <h3>Comments</h3>
        <ul>
          {{#each comments}}
            <li>{{text}}</li>
          {{/each}}
        </ul>
      {{/if}}
```

Next, we see if there are any comments on the photo. If there are, we create a section and list for comments, and iterate through them. Note that in this `{{#each}}` expression, we aren't binding the comment object to the model property, so the context is automatically set to it. We create a new `<li>` for each comment with the comments text, and close out our `{{#each}}` iteration, list, and {{#if}}.

```handlebars
  {{/view}}
{{/each}}
```

Now that we're done, we close out the subview and our iteration block. Our view is complete.

### Creating our Client-side Controller

Controllers serve as a mediator between your views and models. We've already discussed that we're going to need an `Ember.ArrayController` to manage our photo objects, so let's create it. You can create a new controller using the `ember:controller` generator. We can also create a new array controller by invoking the generator with the `--array` option:

```
rails generate ember:controller photos --array
```

This will generate a new array controller called `Photoblog.photosController` inside the `app/assets/javascripts/controllers/photos_controller.js` file. Note that this file also creates a class called `Photoblog.PhotosController`. This allows you to easily create new instances of the controller for unit testing without having to reset singletons to their original state.

The `Ember.ArrayController` provides us with all the functionality we need for now, so no extra code is needed.

### Loading the App

We've now gone through the process of describe out models, views, and controllers to Ember and Rails. Let's get things off the ground by viewing our application!

The Rails template that we based out application off of came with a Rails controller called AssetsController and an associated view and route. This is designed to simply serve our application content, which is basically an empty page with the javascript code which will launch and run our app.

The last thing for us to do is to add the bootstraping code for our app. In `assets/javascripts/application.js`, we should *append* the following:

```javascript
  Photoblog.photosView = Ember.ContainerView.create({
    currentViewBinding: 'Photoblog.stateManager.currentState.view'
  });
  Photoblog.photosView.append();
```

We're doing a few things here. First, we're getting all the photos in our data store, and setting the `model` of our `photosController` to the results array. Next, we set the data store's adapter mappings so that it knows comments are `Photoblog.Comments`. We then move to our initial state, and create an `Ember.ContainerView` with a `currentView` property that is bound to our current state's `view` property. Finally, add the `photosView` to the page.

You can now view the app in your browser by running `rails server` going to `http://localhost:3000`. You should see something like this:

![First site screenshot](/images/rails_site_1.png)

There's our title, but there's no content! We need to add some photos first, of course.

### Adding a Test Photo

We need to add the ability to add photos to our application in order to see some on the index page. First, let's verify everything is working as expected by sending a POST request to our API with a new photo object. Ensure the server is running, and execute the following command:

```
curl -H "Content-Type: application/json" -X POST -d '{"photo":{"url":"http://farm8.staticflickr.com/7101/7007178689_9cd571fa10.jpg", "title":"Books"}}' http://localhost:3000/photos
```

This sends a json payload to our server with data for a new photo. Reload the page. You should see a new photo with its title listed on the index page. You'll also see the logs in the console where your server is running, showing the request being handled. If you don't see the photo, jump down to the troubleshooting section below.

Now that we're sure everything is working, we want to be able to add photos through our Ember.js app. To do this, we'll write a new view.

### Add the New Photo View

We want to add a button at the bottom of of our index view that lets us create a new photo. To do so, we'll write a new view, a template and controller for it, and add a new state to the state manager to represent the user being in the add photo state.

First create the controller. A standard controller will work fine, we don't need an array controller in this case.

```
rails generate ember:controller photo
```

Next, create the new view.

```
rails generate ember:view create photo
```

Modify the template for the create view at `app/assets/javascripts/templates/photos/create.handlebars` to look like this:

```handlebars
<h1>Add a New Photo</h1>
{{template "photos/_form"}}
```

We use the handlebars expression `template` to refer to another template we'd like to load, in this case, the _form template. This should be very familiar to rails users. You'll see why this is important later.

Let's create the `_form` template in `app/assets/javascripts/templates/photos/_form.handlebars`. It will include only the form elements for our photo, like so:

```handlebars
<label for="title-field">Title:</label>{{input id="title-field" value=model.title}}
<label for="url-field">URL:</label>{{input id="url-field" value=model.url}}

<button {{action 'save' target="Photoblog.stateManager"}}>Save</button>
<button {{action 'cancel' target="Photoblog.stateManager"}}>Cancel</button>
```

We create two Ember.TextField views, and we bind the value property (which will be the text in the text field) to that of our controllers' model's title and url objects, respectively. The controller is is the PhotoController, which we created above. Its model will be a photo object.

We then have a save button and cancel button, both of which target our state manager.

Next, Take a look at the view in `app/assets/javascripts/views/photos/create_view.js`. It should reference both the template and the controller we just created.

```javascript
Photoblog.CreateView = Ember.View.extend({
  templateName: 'photo/create',
  controller: Photoblog.photoController
});
```

Let us now make the changes to our state manager to hook up all of these components together.

Inside our `index` state, we should add a new action, which tells our manager to go to the `create` state.

```javascript
showCreate: function(manager) {
  manager.goToState('create');
}
```

Note that you should always have actions within states that send the state manager to another state, as opposed to having other objects control the state manager. This allows for better encapsulation and more reusable code.

Now, inside our `photos` parent state, we should add a new substate, called `create`.

```javascript
create: Ember.State.create({
view: Photoblog.CreateView.create(),

enter: function(manager) {
  var transaction = Photoblog.store.transaction();
  var photo = transaction.createRecord(Photoblog.Photo);

  manager.photoController.set('model', photo);
  manager.set('transaction', transaction);
},

save: function(manager) {
  var transaction = manager.get('transaction');
  transaction.commit();

  manager.goToState('index');
},

cancel: function(manager) {
  var transaction = manager.get('transaction');
  transaction.rollback();

  manager.goToState('index');
}
})
```

Let's go through this and explain what's going on.

```javascript
create: Ember.State.create({
	view: Photoblog.CreateView.create(),
```

Create a new state called `create`, which uses a new Photoblog. CreateView as its view.

```javascript
enter: function(manager) {
  var store = manager.get('store');
  var transaction = store.transaction();
  var photo = transaction.createRecord(Photoblog.Photo);

  manager.photoController.set('model', photo);
  manager.set('transaction', transaction);
},
```

Here, we define the `enter` action of this state. `enter` and `exit` are special actions that are automatically called whenever the state manager enters or exits that particular state. Here, we set up a new transaction with our store, and create a new `photo` object from that transaction. We set it to be the model of our `photoController`, and save off the `transaction` for later use.

```javascript
save: function(manager) {
  var transaction = manager.get('transaction');
  transaction.commit();

  manager.goToState('index');
},

cancel: function(manager) {
  var transaction = manager.get('transaction');
  transaction.rollback();

  manager.goToState('index');
}
```

Now we define the `save` and `cancel` actions we referenced in our create view template earlier. Both of them get the current transaction, and the save action calls `commit()` where as the cancel action calls `rollback()`. `commit()` saves our photo object to the data store, which takes care of making the API request to save the data on our backend for us. `rollback()` undos any changes made in the transaction. Both actions then tell the manager to go back to the index state.

Finally, we will add a button to the index template, at the very bottom, which tells our state manager to show the create view.

```handlebars
<button {{action 'showCreate' target="Photoblog.stateManager"}}>Add Photo</button>
```

With all of this in place, ensure your server is running, and reload the index page. You should see a button at the bottom which takes you to our new create view and lets you add photos!

### Add an Edit Photo View

We should have an edit view to let us modify photo titles at URLs. Creating this will be very similar to the previous step. We will add a view, a template, and modify the state manager. We can use the same photo controller we used in the previous step.

First, lets add the new view at `app/assets/javascripts/views/photos/edit_view.js`

```javascript
Photoblog.EditView = Ember.View.extend({
  templateName: 'templates/photos/edit',
  controller: Photoblog.photoController
});
```

Now, we'll add the template for it at `app/assets/javascripts/templates/photos/edit.handlebars`.

```handlebars
<h1>Edit a Photo</h1>
{{template "templates/photos/_form"}}
```

Note that we can reuse our form elements from the previous step. The only thing that is different is the header text.

Now, the bulk of our change is in the state manager. Below our create substate, lets add a new substate called `edit`:

```javascript
edit: Ember.State.create({
	view: Photoblog.EditView.create(),

	enter: function(manager) {
	  var transaction = Photoblog.store.transaction();
	  var photo = Photoblog.photoController.get('model');
	  transaction.add(photo);

	  manager.set('transaction', transaction);
	},

	save: function(manager) {
	  var transaction = manager.get('transaction');
	  transaction.commit();

	  manager.goToState('index');
	},

	cancel: function(manager) {
	  var transaction = manager.get('transaction');
	  transaction.rollback();

	  manager.goToState('index');
	}
})
```

Much like in the previous step, we set a view property which is a new `Photoblog.EditView`.  The `save` and `cancel` actions are the same, but the `enter` action is a little bit different. Here, instead of creating a new record, we get the existing one from the `photoController`, and add it to our transaction.

Further up, in the state manager, we should add a function which lets us go from the index state to the edit state. In the index substate, add the following after `showCreate`:

```javascript
showEdit: function(manager, evt) {
  var photo = evt.context;
  Photoblog.photoController.set('model', photo);
  manager.goToState('edit');
}
```

Ensure that you add a comma to the previous `showCreate`. In this action, we're grabbing the photo from the event context and setting it to the model of our `photoController`.

Lastly, lets add an edit button to each photo on the page. Below the `<img>` tag, add the following button, which targets our state manager's new `showEdit` action.

```handlebars
<a href="#" {{action 'showEdit' target="Photoblog.stateManager"}}>Edit Photo</a>
```

Reload the page. There should now be an "Edit Photo" link below each photo that will take you to our new Edit Photo view.

### Troubleshooting

We'll update this page with common issues as they come up. In the mean time, see our [Ember.js community](/community) page for more info on how to get help.
