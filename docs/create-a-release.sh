# Create a Release #

First thing to do is bump the version number in the `package.json`. Adhere to [SemVer](http://semver.org/).

Then:

```
echo "Getting release information ..."
VERSION=`jq --raw-output .version package.json`
DATE=`date +'%Y-%m-%d'`
echo

echo "Commiting new package.json ..."
git add package.json
git commit -m "Release v$VERSION - $DATE"
echo

git show | cat
```

The only change in this commit is the "version" line of `package.json`.

If that all looks okay, do a `git push origin master`.

## Build ##

Now build and tag the release:

```
echo "Building the project for release ..."
node build.js
git add dist/
git commit -m "Built v$VERSION"
git push origin master
git tag v$VERSION
git push origin v$VERSION
echo
```

## Release ##

Here's a small script to follow so that you don't push to npm anything that shouldn't be there:

```
echo "Getting dir information ..."
CURRENT_DIR=`pwd`
DIR_NAME=`basename $CURRENT_DIR`
echo

echo "Cloning the repo to /tmp/$DIR_NAME ..."
cd /tmp/
git clone $CURRENT_DIR
echo

echo "Publishing the package ..."
cd $DIR_NAME
npm publish
echo

echo "Tidying up the freshly cloned repo ..."
cd ../
rm -rf $DIR_NAME
cd $CURRENT_DIR
echo
```

(Ends)
