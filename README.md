# Middleware.js

[![Travis](https://api.travis-ci.org/marcellodesales/middleware-js.svg)](https://travis-ci.org/marcellodesales/middleware-js) [![npm version](https://badge.fury.io/js/middleware-js.svg)](http://badge.fury.io/js/middleware-js) [![Codacy Badge](https://www.codacy.com/project/badge/172621abbd81457d84ee5df6ebe13f91)](https://www.codacy.com/app/marcellodesales/middleware-js) [![Dependency Status](https://david-dm.org/marcellodesales/middleware-js.svg)](https://david-dm.org/marcellodesales/middleware-js) [![devDependency Status](https://david-dm.org/marcellodesales/middleware-js/dev-status.svg)](https://david-dm.org/marcellodesales/middleware-js#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/marcellodesales/middleware-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/marcellodesales/middleware-js?branch=master) ![License](https://img.shields.io/badge/license-MIT-lightgray.svg)

Declare middleware dependencies from your modules, that are injectable to your modules. No more `require('../../../../my/middleware')`!

```js
  // Instead the combersome path calculation. DONT DO THIS ANYMORE!
  var conf = require("../../../middleware/config");

  // Loads APP_DIR/middleware/config. DO THIS INSTEAD!
  var config = MiddlewareJs.require("middleware.config");
```

[![NPM](https://nodei.co/npm/middleware-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/middleware-js/)

# What is this?

* Facility to easily `require` any module in your module or application without computing paths.
 * No more `require('../../../../my/middleware/logging')` in your code but just `require('my.middleware.logging')`.
* Your module or application requires something that only the user knows how to setup.
 * New Relic uses its own instance of Bunyan logger.
* You want to provide freedom to users to choose whatever depedency they want.
 * Logging using Bunyan or Winston.

# Installation

```sh
npm install --save middleware-js
```

# MiddlewareJS Object

Requiring dependencies that range from a variety of modules needed by any Enterprise application:

* *Logging*: Most applications use a logger. It is imperative for cloud applications to comply to standards.
 * Logger instances that write to the file-system breaks 12-factor apps.
 * You cannot control the logger instance from the required module. For instance, the module `newrelic` creates its own logger which writes to the file system.
 * The instance you use is different than the module. For instance, some use `Bunyan` while others `Winston`. However, both uses the same interface methods for logging as `log.info`, `log.error`, etc.
* *Configuration*: Building settings related to a given module is harder, specially because you don't know how your client uses configuration management.
 * You can require your clients to provide settings in a given directory. For instance, the module `newrelic` loads a file from the root directory. They could provide a different loader function that loads the properties from your configuration management such as `nconf`.

## Middleware.require(path)

The module computes the APP directory by default and loads the module at the given path. 

* *path*: Path to the middleware you want to be required.
 *path-notation*: You can use the path notation: "path/to/middleware". Specially when you are automating using files.
 *dot-notation*: You can use the dot notation: "path.to.middleware". Specially when you are automating using object-paths.

```js
  // Instead the combersome path calculation. DONT DO THIS ANYMORE!
  var conf = require("../../../middleware/config");

  // Loads APP_DIR/middleware/config. DO THIS INSTEAD!
  var config = MiddlewareJs.require("middleware.config");

  // Loads APP_DIR/middleware/logger
  var logger = MiddlewareJs.require("middleware/logger");
```

See the test cases `test/loadSettingsFromMiddleware.js` for complete details.

## Middleware.from(dirPath)

The module uses the given dirPath as the base dir and return the middleware itself as fluent API and, thus, must be used with `load()`.

* *dirPath*: the search path other than the current APP directory resolved by default.
 * Useful when loading anything outside your application directory.

```js
  // Loads /shared/modules/default/logger
  var logger = MiddlewareJs.from("/shared/modules").require("default.logger");

  // Loads /secret-service/certs
  var secrets = MiddlewareJs.from("/secret-service").require("certs");
```

See the test cases `test/loadSettingsFromMiddleware.js` for complete details.

# Error Handling

Since this is a synchronous library, attempting to load modules from computed paths that are non-existent will throw exceptions.

Also, remember that this module uses `require()` and the middleware loaded is cached as usual.

See the test cases `test/loadSettingsWithErrors.js` for complete details.

# Use cases

* *New Relic*: it uses their own logging capability. What if they required you to provide the logging capability instead?
* *Frameworks*: You can be smart frameworks that requires middlewares in order to properly work.
 * This is a good example of designing a shared module using Interfaces.

# Contributing

We use the GitFlow branching model http://nvie.com/posts/a-successful-git-branching-model/.

1. Fork this project.
2. Create your feature branch (`git checkout -b feature/issue-444-Add-Rest-APIs origin/master --track`)
 * Adding the Jira ticket ID helps communicating where this feature is coming from.
3. Commit your changes (`git commit -am 'Fix #444: Add support to REST-APIs'`)
 * Adding "fix #444" will trigger a link to the GitHub issue #444.
4. Push to the branch (`git push feature/issue-444-Add-Rest-APIS`)
5. Create new Pull Request as indicated by this page or your forked repo.
