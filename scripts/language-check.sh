BLOG_HAS_CHANGES=$(git diff --name-status master source/blog/2*)
if [[ $BLOG_HAS_CHANGES ]]
  then
    alex $(git diff --name-status master source/blog/2* | sed s/^..//)
fi
