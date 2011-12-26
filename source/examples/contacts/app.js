App = SC.Application.create();

/*

  Model

*/

App.Contact = SC.Object.extend({
  firstName: '',
  lastName: '',

  hasName: function() {
    var firstName = this.get('firstName'),
        lastName = this.get('lastName');

    return firstName !== '' || lastName !== '';
  }.property('firstName', 'lastName')
});

/*

  Controllers

*/

App.contactsController = SC.ArrayController.create({
  // The array of Contact objects that backs the array controller.
  content: [],

  // The content array, sorted by first name, or last
  // name if no first name is provided.
  sortedContacts: function() {
    var content = this.get('content');

    return content.slice().sort(function(a, b) {
      var firstNameA = a.get('firstName'),
          firstNameB = b.get('firstName');

      if (!firstNameA) {
        firstNameA = a.get('lastName');
      }

      if (!firstNameB) {
        firstNameB = b.get('lastName');
      }

      if (!firstNameA && firstNameB) { return 1; }
      if (!firstNameB && firstNameA) { return -1; }
      if (firstNameA < firstNameB) { return -1; }
      if (firstNameA > firstNameB) { return 1; }
      return 0;
    });

    // Every time a contact's first name or last name changes,
    // recompute the order. Since this is a somewhat expensive
    // operation, the cacheable() flag means that the computed
    // value will be automatically memoized.
  }.property('@each.firstName', '@each.lastName').cacheable(),

  // Creates a new, empty Contact object and adds it to the
  // array controller.
  newContact: function() {
    this.pushObject(App.Contact.create({
      phoneNumbers: []
    }));
  },

  loadContacts: function() {
    var self = this;
    $.ajax({
      url: '/contacts.json',
      dataType: 'json',
      success: function(data) {
        var contacts = data.contacts;

        // Turn JSON objects into bindable Ember
        // objects.
        contacts = contacts.map(function(item) {
          return self.createContactFromJSON(item);
        });

        self.set('content', contacts);
      },

      error: function() {
        self.pushObject(self.createContactFromJSON({
          firstName: 'Peter',
          lastName: 'Wagenet',
          phoneNumbers: ['(415) 555-2381']
        }));

        self.set('isFromFixtures', true);
      }
    });
  },

  createContactFromJSON: function(json) {
    json.phoneNumbers = json.phoneNumbers.map(function(number) {
      return { number: number };
    });

    return App.Contact.create(json);
  }
});

App.contactsController.loadContacts();

App.selectedContactController = SC.Object.create({
  content: null
});

App.DeleteNumberView = SC.View.extend({
  classNames: ['delete-number-view'],
  click: function() {
    var phoneNumber = this.get('content');
    var contact = this.getPath('contentView.content');

    contact.get('phoneNumbers').removeObject(phoneNumber);
  }
});

App.EditField = SC.View.extend({
  tagName: 'span',
  templateName: 'edit-field',

  doubleClick: function() {
    this.set('isEditing', true);
    return false;
  },

  focusOut: function() {
    this.set('isEditing', false);
  },

  keyUp: function(evt) {
    if (evt.keyCode === 13) {
      this.set('isEditing', false);
    }
  }
});

App.TextField = SC.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

SC.Handlebars.registerHelper('editable', function(path, options) {
  options.hash.valueBinding = path;
  return SC.Handlebars.helpers.view.call(this, App.EditField, options);
});

SC.Handlebars.registerHelper('button', function(options) {
  var hash = options.hash;

  if (!hash.target) {
    hash.target = "App.contactsController";
  }
  return SC.Handlebars.helpers.view.call(this, SC.Button, options);
});

App.ContactListView = SC.View.extend({
  classNameBindings: ['isSelected'],

  click: function() {
    var content = this.get('content');

    App.selectedContactController.set('content', content);
  },

  isSelected: function() {
    var selectedItem = App.selectedContactController.get('content'),
        content = this.get('content');

    if (content === selectedItem) { return true; }
  }.property('App.selectedContactController.content')
});

App.CardView = SC.View.extend({
  contentBinding: 'App.selectedContactController.content',
  classNames: ['card'],

  addPhoneNumber: function() {
    var phoneNumbers = this.getPath('content.phoneNumbers');
    phoneNumbers.pushObject({ number: '' });
  }
});

