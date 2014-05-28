### Problem
You want to be able to drag a child component from one parent component into another.

### Solution
Write a parent Ember Component to listen out for drop events and notify its parent controller about the drop. Then, write a nested component that listens out for drag events and sets transfer data on its (grand)parent controller. Finally, specify `draggable=true` on the child component.

Parent component can look as follows: 

```handlebars
  <!-- Properties: containerTitle, stage, tasks -->
  <script type="text/x-handlebars" id="components/task-container">
    <h3>{{containerTitle}}</h3>
    {{#each task in tasks}}
      {{drag-task task=task stage=stage}}
    {{/each}}
  </script>
```

```javascript
App.TaskContainerComponent = Em.Component.extend({
  classNames: ['col-xs-4', 'taskContainer'],
  isOverdrop: false,
  classNameBindings: ['isOverdrop:isOverdrop'],

  setOverdropIfNotOriginator: function(valueToSet){
    var data = this.get('targetObject').get('transferData');    
    if(data.stage !== this.get('stage')) {
      this.set('isOverdrop', valueToSet);
    }
  },

  dragEnter: function() {
    this.setOverdropIfNotOriginator(true);
  },
  
  dragLeave: function(){
    this.setOverdropIfNotOriginator(false);
  },
    
  dragOver: function(){
    this.setOverdropIfNotOriginator(true);    
    event.preventDefault();
  },
    
  drop: function(event) {
    var data = this.get('targetObject').get('transferData');    
    if(data.stage === this.get('stage')) return;

    // from: data.stage, to: this.get('stage')
    this.sendAction('action', data.id, data.stage, this.get('stage'));
    this.set('isOverdrop', false);
  }

});

```

Child component can look as follows:

```handlebars
  <!-- Properties: task, stage -->  
  <script type="text/x-handlebars" id="components/drag-task">
    <div class="task" draggable="true">
      {{task.name}}
    </div>
  </script>
```

```javascript
App.DragTaskComponent = Em.Component.extend({
  dragStart: function(event) {
    var data = { id: this.get('task.id'), stage: this.get('stage')};
    this.get('targetObject').get('targetObject').set('transferData', data);
  }
});
```  

The controller they are both communicating with can looks as follows:

```javascript
App.IndexController = Em.Controller.extend({
  transferData: {}, 
  actions: {
    moveTask: function(taskID, from, to){
      var model = this.get('model'); 
      var task = model[from].findProperty('id', parseInt(taskID, 10));
      model[to].pushObject(task);
      model[from].removeObject(task);
    }
  }
});
```

Finally, you can use these components as follows:

```handlebars
  <script type="text/x-handlebars" data-template-name="index">
    <div class="contents">
      <div class="row">
        {{ task-container containerTitle="New" stage="newTasks" tasks=model.newTasks 
           action="moveTask" on="drop"}}
        {{ task-container containerTitle="In Progress" stage="inProgressTasks" 
           tasks=model.inProgressTasks action="moveTask" on="drop" }}
        {{ task-container containerTitle="Done" stage="doneTasks" tasks=model.doneTasks 
           action="moveTask" on="drop" }}
      </div>
      <br>
      <br>
    </div>
  </script>
```

### Discussion


#### Example
<a class="jsbin-embed" href="http://emberjs.jsbin.com/ciqed/1/">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
