### Built-in Views

Ember comes pre-packaged with a set of views for building a few basic controls like text inputs, check boxes, and select lists.

They are:

####Ember.Checkbox
	
```handlebars
    <label>
      {{view Ember.Checkbox checkedBinding="content.isDone"}}
      {{content.title}}
    </label>
```
	
####Ember.TextField
	
```javascript
	App.MyText = Ember.TextField.extend({
	    formBlurredBinding: 'App.adminController.formBlurred',
	    change: function(evt) {
	      this.set('formBlurred', true);
	    }
	  });
```
	
####Ember.Select
	
```handlebars
	{{view Ember.Select viewName="select"
                          contentBinding="App.peopleController"
                          optionLabelPath="content.fullName"
                          optionValuePath="content.id"
                          prompt="Pick a person:"
                          selectionBinding="App.selectedPersonController.person"}}
```
	
####Ember.TextArea
	
```javascript
	var textArea = Ember.TextArea.create({
      		valueBinding: 'TestObject.value'
    		});
```

