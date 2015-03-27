### Problem
You want Rails style flash messages to appear in your application and alert the user that something has happened.

### Solution
Use a simple array controller to keep track of the current messages, a model to hold the message and what type of alert it is, a view with an action to remove the alert and a template to show it on the page.

The page needs a container for the flash messages.

```handlebars
<script type="text/x-handlebars">
    {{#each flashMessage in controllers.flash.content}}
        {{view "flash" contentBinding="flashMessage"}}
    {{/each}}
</script>
```

It also needs a template for a flash message.

```handlebars
<script type='text/x-handlebars' id='flash'>
    {{#if flashMessage.isNotice}}
    <div class="alert notice">
        {{flashMessage.message}}
        <button type="button" class="right" {{action "click" flashMessage target=view}}><span>&times;</span></button>
    </div>
    {{/if}}
    {{#if flashMessage.isSuccess}}
    <div class="alert success">
        <button type="button" class="right" {{action "click" flashMessage target=view}}><span>&times;</span></button>
        {{flashMessage.message}}
    </div>
    {{/if}}
    {{#if flashMessage.isError}}
    <div class="alert error">
        <button type="button" class="right" {{action "click" flashMessage target=view}}><span>&times;</span></button>
        {{flashMessage.message}}
    </div>
    {{/if}}
</script>
```

We need a controller to keep track of all the flash messages

```js
App.FlashController = Ember.ArrayController.extend({
    createFlash: function(options) {
        if (options.type !== null && options.message !== null) {
            this.pushObject(this.get('store').createRecord(
                "flashMessage", {
                    type: options.type,
                    message: options.message
                }
            ));
        }
    }
});
```

We also need model for a flash message.

```js
App.FlashMessage = DS.Model.extend({
    type: DS.attr('string'),
    message: DS.attr('string'),
    isNotice: function() {
        return this.get("type") === "notice";
    }.property("type"),
    isSuccess: function() {
        return this.get("type") === "success";
    }.property("type"),
    isError: function() {
        return this.get("type") === "error";
    }.property("type")
});
```

If a controller wants to create a flash message then it 'needs' the Flash controller. Here the Application controller creates a flash message in response to an action.

```js
App.ApplicationController = Ember.Controller.extend({
    needs: ['flash'],
    actions: {
        createFlashNotice: function() {
            this.get('controllers.flash').createFlash({
                type: "notice",
                message: "I'm a flash notice."
            });
        },
        createFlashError: function() {
            this.get('controllers.flash').createFlash({
                type: "error",
                message: "I'm a flash error."
            });
        },
        createFlashSuccess: function() {
            this.get('controllers.flash').createFlash({
                type: "success",
                message: "I'm a flash success."
            });
        }
    }
});
```

We need a view for a flash messages which can remove it in response to a user action.

```js
App.FlashView = Ember.View.extend({
    templateName: 'flash',
    classNames: ['hide'],
    didInsertElement: function() {
        this.$().fadeIn(1000);
    },
    actions: {
        click: function(alert) {
            this.get('controller').get(
                'controllers.flash').removeObject(
                this.get('content'));
            this.destroy();
        }
    }
});
```

#### Discussion
The HTML needs a template to render all the current messages in the FlashController which is shown in the main handlebars template. Each individual message is then rendered using the second handlebars template with the id of 'flash'. The FlashController is an ArrayController with a list of current flash messages. Each FlashMessage model is created with by calling the 'createFlash' function on the FlashController with an options object. The options object contains the type of the message ('notice', 'success' or 'error') and the message itself. The model also has a helper function to return which type of message it is so that we can style it appropriately. Each flash message has a FlashView which fades the message in when it has been inserted using the didInsertElement handler. The flash message can then be removed by clicking on the 'X' that the handlebars template renders which triggers the 'click' action in the view. This then removes the flash message from the FlashController and also destroys the view. 

#### Example
Click on one of the buttons to create a flash message and remove it by clicking on the 'x'.
<a class="jsbin-embed" href="http://jsbin.com/magimicadi/1/embed?output">JS Bin</a>

Thanks to [Eric Berry](http://coderberry.me/blog/2013/06/20/using-flash-messages-with-emberjs/) for the 'flash' of inspiration.
