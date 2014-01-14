pathvisiojs github page
=======================

Github page for PathVisiojs diagram viewer/editor. Note that this gh-pages branch is just for the [Pathvisiojs Github page](http://wikipathways.github.io/pathvisiojs/). The code for the actual project is at the [master branch](https://github.com/wikipathways/pathvisiojs/).

If you edit anything in this branch, please be careful to avoid mixing up content from the gh-pages branch and the master branch. No content from this branch should be introduced into the master branch. The only content from the master branch that should get introduced into this branch is the content in the following directories:

* ./build/
* ./lib/
* ./src/
* ./test/

The workflow should be as follows:

A. From master branch, checkout gh-pages branch, using the "-f" option to force git to only surface the content actually in the gh-pages branch:

```
$ git checkout -f gh-pages
```

B. Merge in code from master branch:

```
$ git checkout ./build/
$ git checkout ./lib/
$ git checkout ./src/
$ git checkout ./config/
$ git checkout ./test/
```

C. Pull changes from github. Use the remote name you have set up for the wikipathways repo, if it's not origin.

```
$ git pull origin gh-pages
```

D. Edit any of the gh-pages-specific content

E. Pull changes from github and push to github. Use the remote name you have set up for the wikipathways repo, if it's not origin.

```
$ git pull origin gh-pages
$ git push origin gh-pages
```

F. Checkout master again:

```
$ git checkout -f master
```
