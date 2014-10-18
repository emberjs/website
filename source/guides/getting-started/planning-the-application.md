TodoMVC, despite its small size, contains most of the behaviors typical in modern single page applications. Before continuing, take a moment to understand how TodoMVC works from the user's perspective.

TodoMVC has the following main features:
<img src="/guides/getting-started/images/todo-mvc.png" width="680">

  1. It displays a list of todos for a user to see. This list will grow and shrink as the user adds and removes todos.

  1. It accepts text in an `<input>` for entry of new todos. Hitting the `<enter>` key creates the new item and displays it in the list below.

  1. It provides a checkbox to toggle between complete and incomplete states for each todo. New todos start as incomplete.

  1. It displays the number of incomplete todos and keeps this count updated as new todos are added and existing todos are completed.

  1. It provides links for the user to navigate between lists showing all, incomplete, and completed todos.

  1. It provides a button to remove all completed todos and informs the user of the number of completed todos. This button will not be visible if there are no completed todos.

  1. It provides a button to remove a single specific todo. This button displays as a user hovers over a todo and takes the form of a red X.

  1. It provides a checkbox to toggle all existing todos between complete and incomplete states. Further, when all todos are completed this checkbox becomes checked without user interaction.

  1. It allows a user to double click to show a textfield for editing a single todo. Hitting the `<enter>` key or moving focus outside of this textfield will persist the changed text.

  1. It retains a user's todos between application loads by using the browser's `localstorage` mechanism.

You can interact with a completed version of the application by visiting the [TodoMVC site](http://todomvc.com/examples/emberjs/).
