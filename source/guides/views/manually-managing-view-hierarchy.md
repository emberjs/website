### Manually Managed Views with Ember.ContainerView

Usually, views create their child views by using the `{{view}}` helper. Sometimes it is useful to manually manage a view's
child views. If you create an instance of `Ember.ContainerView`, the `childViews` array is editable. Views that you add
are rendered to the page, and views that you remove are removed from the DOM.

```javascript
var container = Ember.ContainerView.create();
container.append();

var coolView = App.CoolView.create(),
    childViews = container.get('childViews');

childViews.pushObject(coolView);
```

As a shorthand, you can specify the child views as properties and the child views as a list of keys. When the
container view is created, these views will be instantiated and added to the child views array:

```javascript
var container = Ember.ContainerView.create({
  childViews: ['firstView', 'secondView'],
  
  firstView: App.FirstView,
  secondView: App.SecondView
});
```
