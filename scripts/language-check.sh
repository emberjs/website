git remote add base https://github.com/emberjs/website.git
git fetch base
BLOG_HAS_CHANGES=$(git diff --name-status base/master source/blog/2*)
if [[ $BLOG_HAS_CHANGES ]]
  then
    alex $(git diff --name-status base/master source/blog/2* | sed s/^..//)
fi
