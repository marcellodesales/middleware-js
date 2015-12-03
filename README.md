# Middleware.js

[![Travis](https://api.travis-ci.org/marcellodesales/middleware-js.svg)](https://travis-ci.org/marcellodesales/middleware-js) [![npm version](https://badge.fury.io/js/middleware-js.svg)](http://badge.fury.io/js/middleware-js) [![Codacy Badge](https://www.codacy.com/project/badge/172621abbd81457d84ee5df6ebe13f91)](https://www.codacy.com/app/marcellodesales/middleware-js) [![Dependency Status](https://david-dm.org/marcellodesales/middleware-js.svg)](https://david-dm.org/marcellodesales/middleware-js) [![devDependency Status](https://david-dm.org/marcellodesales/middleware-js/dev-status.svg)](https://david-dm.org/marcellodesales/middleware-js#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/marcellodesales/middleware-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/marcellodesales/middleware-js?branch=master) ![License](https://img.shields.io/badge/license-MIT-lightgray.svg)

Declare middleware dependencies from your modules, that are injectable to your modules. No more `require('../../../../my/middleware')` but just `require('my.middleware')`.

[![NPM](https://nodei.co/npm/middleware-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/middleware-js/)

# What is this?

* Facility to easily load any module in your module or application without computing paths.
 * No more `require('../../../../my/middleware/logging')` in your code but just `require('my.middleware.logging')`.
* Your module or application requires something that only the user knows how to setup.
 * New Relic uses its own instance of Bunyan logger.
* You want to provide freedom to users to choose whatever depedency they want.
 * Logging using Bunyan or others.
* Require a given middleware as optional or required.

# Installation

```sh
npm install --save middleware-js
```

# MiddlewareJS Object

* The module computes the APP directory as the process.PWD. From:

```js
  var conf = require("../../../middleware/config");
```

to 

```js
  var conf = MiddlewareJs.instance().load("middleware.config");
```

* Optional parameter provided via `opts.fromDir`.

```js
  var conf = MiddlewareJs.instance({fromDir: "/apps/shared-modules"}).load("middleware/config");
```

# Use cases
------

New Relic uses their own logging capability. What if they required you to provide the logging capability instead?

Contributing
==============

We use the GitFlow branching model http://nvie.com/posts/a-successful-git-branching-model/.

1. Fork this project.
2. Create your feature branch (`git checkout -b feature/issue-444-Add-Rest-APIs origin/master --track`)
 * Adding the Jira ticket ID helps communicating where this feature is coming from.
3. Commit your changes (`git commit -am 'Fix #444: Add support to REST-APIs'`)
 * Adding "fix #444" will trigger a link to the GitHub issue #444.
4. Push to the branch (`git push feature/issue-444-Add-Rest-APIS`)
5. Create new Pull Request as indicated by this page or your forked repo.
