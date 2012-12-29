## Nested Routes

While it's usually enough to get started with a flat hierarchy of
states, as your application grows you may find that you need to model
the concept of _nested state_.

For example, let's revisit our example blog application. There are many
different states—viewing a list of blog posts, creating a new post, or
displaying a single blog post. Switching between these states removes
the old template and displays a new one.

Let's imagine we are viewing a single blog post, though. It might have a
URL like this: `/posts/123`. Visiting this URL shows the blog post with
ID `123` by rendering the `post` template.

![Blog with nested states](/guides/routing/images/nested-states.png)

Note the `Comments` and `Trackbacks` buttons at the bottom. Switching
between these two is what we're talking about when we talk about nested
state. We are still in the "showing a single post" state, but that state
itself has sub-states that users can switch between.

If the user toggles between showing comments and showing trackbacks, we
shouldn't have to re-render the entire template. Instead, we should be
able to switch between states and have them update only a part of their
parent template.
