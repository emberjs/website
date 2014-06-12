### Problem

You want to use a datepicker for date input

### Solution

This recipe relies on

  * - Twitter [Bootstrap Datepicker](http://www.eyecon.ro/bootstrap-datepicker/)
  * - [Moment.js](http://momentjs.com/) for Date parsing and formatting

We define a date picker field by extending Ember's view:

```js
App.DatePickerField = Em.View.extend({
  templateName: 'datepicker',

// Decorator function for formatting data output
  valueAsDate: function() {
    return moment(this.get('value')).format('DD.MM.YYYY');;
  }.property('view.value'),

//Callback function feeding back the changes that happened
//to the value in the datepicker
  didInsertElement: function() {
    var onChangeDate, self = this;
    onChangeDate = function(ev) {
      return self.set('value', moment(ev.date).format('MM-DD-YYYY'));
    };
    return this.$('.datepicker').datepicker({
      separator: '.'
    }).on('changeDate', onChangeDate);
  },
});

// Allow some more attributes to be bound
Ember.TextField.reopen({
    attributeBindings: ['data-provide', 'data-date-format']
});
```

The template looks like this:

```handlebars
<script type='text/x-handlebars' data-template-name='datepicker'>
  <div class='input-group' style='width:10em;'>
    {{input value=view.valueAsDate class='datepicker form-control'
                                   data-provide='datepicker'
                                   data-date-format='dd.mm.yyyy'}}
    <span class='input-group-addon'>
      <i class='glyphicon glyphicon-calendar'></i>
    </span>
  </div>
</script>
```

The DD.MM.YYYY and dd.mm.yyyy are typical german date formattings, change these according to your needs.
You need not change the MM-DD-YYYY formatting, we use it for handing the data back to Ember.

So now the date picker can be invoked and bound to the object we want to change:

```handlebars
{{view App.DatePickerField value=myitem.mydate}}
```

### Discussion


#### Example

