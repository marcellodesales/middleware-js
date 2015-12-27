"use strict";

var path = require("path");

/**
 * The only instance of the sp core.
 * This required to be in the bottom because it creates an instance.
 */
module.exports = new MiddlewareJs();

/**
 * Constructs a new abstract Monitoring with the basic options.
 *
 * @constructor
 */
function MiddlewareJs() {
  this.fromDir = _resolveClientDirectory();
}

/**
 * The property that gives the path to the application directory.
 */
MiddlewareJs.prototype.APP_DIR = _resolveClientDirectory();

/**
 * Sets the fromDir property pointing to the given path.
 *
 * @param {string} fromDir is the path of a directory containing the middleware.
 */
MiddlewareJs.prototype.from = function from(fromDir) {
  this.fromDir = fromDir;

  // Keep it fluent, return the current instance
  return this;
};

/**
 * Loads a middleware from a given directory. It supports loading the file by the name or by
 * a directory that includes a middleware implementation.
 *
 * * APP_DIR/middleware/moduleName.js: Simpler middleware, generally when this is small.
 * * APP_DIR/middleware/ModuleName/index.js: Useful if your middleware is composed by many other things.
 *
 * * Simple: The middleware itself is an instance of a resolved object.
 *
 * @param {String} modulePath The name of the module to fetch the settings from.
 * @return {Object} an instance of a module from the middleware directory.
 */
MiddlewareJs.prototype.require = function load(modulePath) {
  // If the module is not provided, return undefined.
  if (!modulePath) {
    return;
  }

  var middlewarePath = _getMiddlewarePath(this.fromDir, modulePath);

  try {
    // Attemp to load the middleware at the given path.
    return require(middlewarePath);

  } catch (loadingError) {
    // The error is from the require "module", showing it cannot load the module. We just rename it to "middleware".
    var unknownError = new Error(loadingError.message.replace("Cannot find module", "Cannot find middleware"));
    unknownError.stack = loadingError.stack;
    throw unknownError;
  }
};

/**
 * Resolves the module client directory based on the PWD or the main file loaded.
 */
function _resolveClientDirectory() {
  try {
    // Default app dir is
    return process.env.PWD;

  } catch (errorSettingAppDir) {
    // Maybe this is being loaded in an IDE or "node console"
    return path.dirname(require.main.filename);
  }
}

/**
 * Paths to the middleware that you depend on.
 *
 * @param {String} fromDir is the directory to start looking for.
 * @param {String} modulePath The path to the middleware module in the APP directory.
 * It can be either with the "/" or "." notation.
 * @return {String} Tha path to the given middleware.
 *
 * _getMiddlewarePath("middleware/logger");
 * _getMiddlewarePath("middleware.logger");
 */
function _getMiddlewarePath(fromDir, modulePath) {
  modulePath = modulePath.indexOf(".") > -1 ? modulePath.replace(/\./g, "/") : modulePath;
  return path.resolve(fromDir, modulePath);
}
