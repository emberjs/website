#!/bin/bash
REPO="git@github.com:emberjs/emberjs.github.com.git"

if [ "$TRAVIS_BRANCH" == "master" ]; then
  COMMIT=`git log -1 --oneline`
  git clone $REPO
  rsync -a build/* emberjs.github.com
  cd emberjs.github.com
  git add -A .
  git commit --allow-empty -am "$COMMIT"
  git push origin master
fi