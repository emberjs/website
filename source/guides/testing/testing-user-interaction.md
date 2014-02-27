Almost every test has a pattern of visiting a route, interacting with the page (using the helpers), and checking for expected changes in the DOM.

Examples:

```javascript
test("root lists first page of posts", function(){
  visit("/");
  andThen(function() {
    equal(find(".post").length, 5, "The first page should have 5 posts");
    // Assuming we know that 5 posts display per page and that there are more than 5 posts
  });
});
```

The helpers that perform actions use a global promise object and automatically chain onto that promise object if it exists. This allows you write your tests without worrying about async behaviour your helper might trigger.

```javascript
test("creating a post displays the new post", function(){
  visit("/posts/new");
  fillIn(".post-title", "A new post");
  fillIn(".post-author", "John Doe");
  click("button.create");
  andThen(function() {
    ok(find("h1:contains('A new post')").length, "The post's title should display");
    ok(find("a[rel=author]:contains('John Doe')").length, "A link to the author should display");
  });
});
```

#### Example

Here is an example of an integration test:

<a class="jsbin-embed" href="http://jsbin.com/yokiy/2/embed?output">Custom Test Helpers</a>
<script src="http://static.jsbin.com/js/embed.js"></script>