The Ember.js Getting Started Guide is a guide that walks a new
Ember.js developer through the process of building a small application.

We currently use [TodoMVC](http://todomvc.com/) as a refernece application.

The Getting Started Guide is combination of three resources:
  
  * The Guide text located in [Ember.js website repo](https://github.com/emberjs/website/)
  * A [Github repository](https://github.com/emberjs/quickstart-code-sample/tree/1.0) 
    with a single git commit per step in the guide. Diffs of each step are linked
    in each page of the guide.
  * A set of runnabale JSBins, one for each step, that are displayed inline on each
    page of the guide.

For changes to the non-code text of the guide, a simple pull request to the
[Ember.js website repo](https://github.com/emberjs/website/) is sufficinet.

If you need to make changes to the  code in the guide, the process is a bit
more complex.

## Updating the Sample Application
The sample application located at https://github.com/emberjs/quickstart-code-sample/

Clone this repository locally, noting the current `SHA`s of the steps:

```
git log --pretty=oneline

4830fbe41ed41326ac26025cb98104a0c258dd03 Replacing the fixture store with another adapter
820d0881f8a054a4fb8cf39884abf1d8deaf3867 Toggling all todos between complete and incomplete
41b9e0b07edcf20fef76970944fb7345af2a8853 Showing when are all todos are complete
0ba41cdcbca5cf36bd052d75b91f9dd1b405154c Displaying a button to remove all completed todos
761500ebbe9e6adc41d4f00eb41820ba962041b8 Transitioning back to showing all todos
a76c1efc5a3573242a1b7ae6a53519108190cccf Transitioning to show only complete
88d7880e8f7f68c8dc7e6b933d099bf10b191dd6 Transitioning to show only incomplete todos
ddcb1b480837144c4051d098c476811de81beded Transitioning between routes
dfffa6edfa98d8948715a755e04cd03890336969 Deleting a Model
70eb45e2e69e6bbc30a7d8b69812c6696bbc8cd3 Accepting Edits
7eb87f8f987714385e8381197ec7c77215df8cf9 Toggling between showing and editing states
b878b1bda93e0ae804eb26f28935bd47bc3e84e4 Displaying the number of incomplete todos
44e76869476691787957c0ef919b35cbd3f7d0f4 Marking a Model as Complete or Incomplete
39443bce54a8a7465221ae443b83d3c4a1e3980f Creating a New Model Instance
19d08dd3b294187fadbe57860cf68fc0dc629ad8 Displaying a models's complete state
72b1ccde5e157b20fcfe5da9bd52496e73533d47 Displaying Model Data
9e6e638f4d156399e38b17ae36e191d9cb1f2797 Using fixtures
979ba3a329b8157bb199fda4b8c6a43bab5b6900 Modeling Data
8775d1bf4c05eb82adf178be4429e5b868ac145b Adding the First Route and Template
0880d6e21b83d916a02fd17163f58686a37b5b2c Obtaining Ember.js and dependencies
4d91f9fa1f6be4f4675b54babd3074550095c930 Creating a Static Mockup
```

Move forward through history until you find the first location the change you would like to make occurs:

```
gco 8775d1bf4c05eb82adf178be4429e5b868ac145b
```

Make your changes:

```
vim index.html
rm js/models/store.js
```

Add and commit your changes:

```
git add index.html
git rm js/models/store.js
git commit --amend
```

Then apply this change forward in time:

```
git rebase --onto HEAD HEAD master
```

Git will rebase forward until it encounters a merge conflict or reaches the most recent commit

```
First, rewinding head to replay your work on top of it...
Applying: Using fixtures
Applying: Displaying Model Data
Applying: Displaying a models's complete state
Applying: Creating a New Model Instance
Using index info to reconstruct a base tree...
M index.html
Falling back to patching base and 3-way merge...
Auto-merging index.html
Applying: Marking a Model as Complete or Incomplete
Using index info to reconstruct a base tree...
M index.html
Falling back to patching base and 3-way merge...
Auto-merging index.html
Applying: Displaying the number of incomplete todos
Applying: Toggling between showing and editing states
Applying: Accepting Edits
Applying: Deleting a Model
Applying: Transitioning between routes
Applying: Transitioning to show only incomplete todos
Applying: Transitioning to show only complete
Applying: Transitioning back to showing all todos
Applying: Displaying a button to remove all completed todos
Applying: Showing when are all todos are complete
Applying: Toggling all todos between complete and incomplete
Applying: Replacing the fixture store with another adapter
Using index info to reconstruct a base tree...
M index.html
A js/models/store.js
Falling back to patching base and 3-way merge...
CONFLICT (modify/delete): js/models/store.js deleted in HEAD and modified in Replacing the fixture store with another adapter. Version Replacing the fixture store with another adapter of js/models/store.js left in tree.
Auto-merging index.html
Failed to merge in the changes.
Patch failed at 0017 Replacing the fixture store with another adapter
```

Resolve this conflict, add the changes, and continue the rebase

```
git add index.html
git rm js/models/store.js

git rebase --continue
```

It's possbile there will be nothing to continue and you need to run

```
git rebase --skip
```

Repeat this process of merging and `--continue`ing until there are no
remaining conflicts.

```
3 files changed, 9 insertions(+)
create mode 100644 js/models/todo.js
Successfully rebased and updated refs/heads/master.
```

Note the _new_ git history compared to the old git history:
    
```
e86e26279253e9bcf565fb68c01daa6bec5834e4 4830fbe41ed41326ac26025cb98104a0c258dd03 Replacing the fixture store with another adapter
2a3e63e3c81acbb847a833d4a46165989d80b137 820d0881f8a054a4fb8cf39884abf1d8deaf3867 Toggling all todos between complete and incomplete
2f3b5bf64bf1ddf2f881b463def4d59f85bea688 41b9e0b07edcf20fef76970944fb7345af2a8853 Showing when are all todos are complete
1b19c0dbe27e1b77cb8eba834d332516dbf07c84 0ba41cdcbca5cf36bd052d75b91f9dd1b405154c Displaying a button to remove all completed todos
79d37d3a79e0f90fcedeb99f72bbb841ca99bc73 761500ebbe9e6adc41d4f00eb41820ba962041b8 Transitioning back to showing all todos
bb786b9ba710ab77d984fb5c7da4ea73683509a2 a76c1efc5a3573242a1b7ae6a53519108190cccf Transitioning to show only complete
575cc70267732030053d89cc20c4b45f4870ce59 88d7880e8f7f68c8dc7e6b933d099bf10b191dd6 Transitioning to show only incomplete todos
694681afd343a2df50e6f8602697f2c70782fe20 ddcb1b480837144c4051d098c476811de81beded Transitioning between routes
dbbf1f99e56dc7a2ff2905a9588b0db347c086f1 dfffa6edfa98d8948715a755e04cd03890336969 Deleting a Model
b8f21adad66866fe1225254b34301aa70a47b1d7 70eb45e2e69e6bbc30a7d8b69812c6696bbc8cd3 Accepting Edits
7e50597268a517972fbfac692e18e95d6ad53065 7eb87f8f987714385e8381197ec7c77215df8cf9 Toggling between showing and editing states
7d00339b79ef46d5f4a4b0621009fead1acad7cd b878b1bda93e0ae804eb26f28935bd47bc3e84e4 Displaying the number of incomplete todos
8412845362c3156f779a5ca3124c2abdaa10d98c 44e76869476691787957c0ef919b35cbd3f7d0f4 Marking a Model as Complete or Incomplete
46cb28d049175a3fe3d9ff038566e5f986cebc56 39443bce54a8a7465221ae443b83d3c4a1e3980f Creating a New Model Instance
d6e402f1bba358f167ebe96923ddd634d91d6705 19d08dd3b294187fadbe57860cf68fc0dc629ad8 Displaying a models's complete state
bb4b0ec8d9768bf1349adc8b44ead517e64de6c7 72b1ccde5e157b20fcfe5da9bd52496e73533d47 Displaying Model Data
d750a84ceb053a08f0ec023c40a627841c0f5d97 9e6e638f4d156399e38b17ae36e191d9cb1f2797 Using fixtures
4c9ca555291d8dbedfd8af8ca4f0ea8ff4926200 979ba3a329b8157bb199fda4b8c6a43bab5b6900 Modeling Data
8775d1bf4c05eb82adf178be4429e5b868ac145b 8775d1bf4c05eb82adf178be4429e5b868ac145b Adding the First Route and Template
0880d6e21b83d916a02fd17163f58686a37b5b2c 0880d6e21b83d916a02fd17163f58686a37b5b2c Obtaining Ember.js and dependencies
4d91f9fa1f6be4f4675b54babd3074550095c930 4d91f9fa1f6be4f4675b54babd3074550095c930 Creating a Static Mockup
```

You will see that their histories now diverge at the point of the changed commit.

```
4c9ca555291d8dbedfd8af8ca4f0ea8ff4926200 979ba3a329b8157bb199fda4b8c6a43bab5b6900 Modeling Data
```

All the `SHA`s forward of this point are new.

```
git status

# On branch master
# Your branch and 'origin/master' have diverged,
# and have 18 and 18 different commits each, respectively.
```

## Updating the JSBins
For each step forward of where your change occured you will need to create new
JSBins with sample code and note their URLs. 

There is a branch of the `quickstart-code-sample` repo that has a grunt-based
build process to automate this as much as possible. Unforunately JSBin willnot accept exernal `POST` requests, so this process is more manual than desired.

Once on this branch:

```
touch Gruntfile.js
touch package.json
```

Change back to master, bringing the grunt tasks with you.

```
git checkout master
```

For every `SHA` that has changed run

```
git checkout <THAT SHA WHAT DONE CHANGED> && grunt
```

This will write out a built `out.html` and `out.js` file.
Visit http://jsbin.com/ and create a new bin. Copy the contetns of `out.html` into
the `HTML` tab, the cotents of `style.css` into the `CSS` tab (JSBin will not load linked stylesheets), and the contents of `out.js` into the `Javascript` tab.

Ensure that the `Console` tab does not show errors and that the application in the `Output`
tab functions properly.

From the `Share` menu, select the `Embed` string and note it next to the changed `SHA`.

Be sure that embed link has _only_ the `output` option enabled.

So:

```
<a class="jsbin-embed" href="http://jsbin.com/aZIXaYo/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>
```

Not

```
<a class="jsbin-embed" href="http://jsbin.com/aZIXaYo/1/embed?html,css,js,output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>
```


## Updating the Guide
Finally, match any `SHA` and `JSbin` changes in the guide and submit a pull request.