App = SC.Application.create();

/*

  Model

*/

var names = ["Adam", "Bert", "Charlie", "Dave", "Ernie", "Frances",
  "Gary", "Isabelle", "John", "Kyle", "Lyla", "Matt", "Nancy", "Ophelia",
  "Peter", "Quentin", "Rachel", "Stan", "Tom", "Uma", "Veronica", "Wilson",
  "Xander", "Yehuda", "Zora"];

App.Contact = SC.Object.extend({
  firstName: '',
  lastName: '',

  hasName: function() {
    var firstName = this.get('firstName'),
        lastName = this.get('lastName');

    return firstName !== '' || lastName !== '';
  }.property('firstName', 'lastName'),

  // This value is used to determine how the contact
  // should be sorted in the contacts list. By default
  // we sort by last name, but we use the first name if
  // no last name is provided.
  sortValue: function() {
    return this.get('lastName') || this.get('firstName');
  }.property('firstName', 'lastName')
});

/*

  Controllers

*/

App.contactsController = SC.ArrayController.create({
  // The array of Contact objects that backs the array controller.
  content: [],

  // Adds a new contact to the list and ensures it is
  // sorted correctly.
  add: function(contact) {
    var length = this.get('length'), idx;

    idx = this.binarySearch(contact.get('sortValue'), 0, length);

    this.insertAt(idx, contact);

    // If the value by which we've sorted the contact
    // changes, we need to re-insert it at the correct
    // location in the list.
    contact.addObserver('sortValue', this, 'contactSortValueDidChange');
  },

  // Binary search implementation that finds the index
  // where a contact should be inserted.
  binarySearch: function(value, low, high) {
    var mid, midValue;

    if (low === high) {
      return low;
    }

    mid = low + Math.floor((high - low) / 2);
    midValue = this.objectAt(mid).get('sortValue');

    if (value > midValue) {
      return this.binarySearch(value, mid+1, high);
    } else if (value < midValue) {
      return this.binarySearch(value, low, mid);
    }

    return mid;
  },

  remove: function(contact) {
    this.removeObject(contact);
    contact.removeObserver('sortValue', this, 'contactSortValueDidChange');
  },

  contactSortValueDidChange: function(contact) {
    this.remove(contact);
    this.add(contact);
  },

  // Creates a new, empty Contact object and adds it to the
  // array controller.
  newContact: function() {
    var firstName = Math.floor(Math.random()*names.length),
        lastName = Math.floor(Math.random()*names.length),
        hasLastName = Math.random();

    this.add(App.Contact.create({
      firstName: names[firstName],
      lastName: hasLastName < 0.9 ? names[lastName] : null,
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
  },

  touchEnd: function() {
    this.click();
  }
});

App.EditField = SC.View.extend({
  tagName: 'span',
  templateName: 'edit-field',

  doubleClick: function() {
    this.set('isEditing', true);
    return false;
  },

  touchEnd: function() {
    // Rudimentary double tap support, could be improved
    var touchTime = new Date();
    if (this._lastTouchTime && touchTime - this._lastTouchTime < 250) {
      this.doubleClick();
      this._lastTouchTime = null;
    } else {
      this._lastTouchTime = touchTime;
    }

    // Prevent zooming
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

  touchEnd: function() {
    this.click();
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

