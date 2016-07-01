#!/bin/bash
set -e

REPO="git@github.com:emberjs/emberjs.github.com.git"
COMMIT=`git log -1 --oneline`

if [[ $TRAVIS_PULL_REQUEST != "false" ]]; then
  echo "not publishing because this is a pull request."
  exit 0
fi

if [[ $TRAVIS_BRANCH != "master" ]]; then
  echo "not publishing because this is not the master branch."
  exit 0
fi

git clone $REPO
rsync -a build/* emberjs.github.com
cd emberjs.github.com
git add -A .
git commit --allow-empty -am "$COMMIT"
git push origin master
