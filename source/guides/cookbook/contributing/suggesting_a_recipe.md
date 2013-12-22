### Problem
You'd like to submit a recipe to the Ember Cookbook.

### Solution
[Fork the repository][fork_repo] and create a feature branch named after your
recipe. New recipes should have four sections: a _title_, a _problem statement_, a _solution statement_, and
an empty _discussion section_.

### Discussion
A [feature branch](http://nvie.com/posts/a-successful-git-branching-model/) is a branch in a local git
repository. Its name should be the camel-cased or underscored name of your recipe. For example, the branch
name for this recipe &ndash; "Suggesting a Recipe" &ndash; would be `SuggestingARecipe` or `suggesting_a_recipe`.

The _title_, _problem_, and _solution_ of your recipe should match the Cookbook's style (see
_Understanding the Cookbook Format_). While your recipe should include a _discussion_ section, you should leave
it blank. These sections will be created in a later phase of the Cookbook project.

The filename of your suggested recipe should be the lowercase, underscored version of your recipe's name. The
filename name for this recipe &nash; "Suggesting a Recipe" &ndash; would be `suggesting_a_recipe.mdown`.

When you are ready to submit your recipe, push your local branch to the remote branch on your Github fork and
submit a pull request. Before submitting a pull request, make sure someone hasn't already submitted a similar
recipe and that your recipe is a good fit for the Cookbook (see _Deciding If A Recipe Is A Good Fit_). 

[fork_repo]: https://github.com/emberjs/website
[feature_branch]: http://nvie.com/posts/a-successful-git-branching-model/
[understanding]: /guides/cookbook/contributing/understanding_the_cookbook_format
[deciding]: /guides/cookbook/contributing/deciding_if_a_recipe_is_a_good_fit
