---
id: ember-template-compiler.deprecate-render-block
name: render helper with block
until: 2.4.0
since: 2.4
---

The `{{render}}` helper was never intended to support a block form, but unfortunatley (mostly
due to various refactorings in 1.10 and 1.13) it started working in block form. Since this was
not properly engineered, there are a number of caveats (i.e. the `controller` and `target` values of
anything inside the block are incorrect) that prevent continued support.

Support the following forms will be removed after 2.4:

```handlebars
{{#render 'foo'}}
  <p>Stuff Here</p>
{{/render}}
```

```handlebars
{{#render 'foo' someModel}}
  <p>Stuff Here</p>
{{/render}}
```
