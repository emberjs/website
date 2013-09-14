Ember comes pre-packaged with a set of views for building a few basic controls like text inputs, check boxes, and select lists.

_Note: As of 1.0 pre-packaged views are now implemented as components.  This means that all properties must be explicitly passed into the view._

They are:

#### Ember.Checkbox

```handlebars
<label>
  {{view Ember.Checkbox checkedBinding="model.isDone"}}
  {{model.title}}
</label>
```

#### Ember.TextField

```javascript
App.MyText = Ember.TextField.extend({
  formBlurred: null, // passed to the view helper as formBlurred=controllerPropertyName
  change: function(evt) {
    this.set('formBlurred', true);
  }
});
```

#### Ember.Select

```handlebars
{{view Ember.Select viewName="select"
                    contentBinding="people"
                    optionLabelPath="model.fullName"
                    optionValuePath="model.id"
                    prompt="Pick a person:"
                    selectionBinding="selectedPerson"}}
```

#### Ember.TextArea

```javascript
var textArea = Ember.TextArea.create({
  valueBinding: 'TestObject.value'
});
```

