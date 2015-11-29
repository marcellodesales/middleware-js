"use strict";

var util = require("util");
var events = require("events");
var path = require("path");

/**
 * The only instance of the sp core.
 * This required to be in the bottom because it creates an instance.
 */
module.exports.instance = function instance(opts) {
  return new MiddlewareJs(opts);
};
/**
 * The location of the client directory.
 */
module.exports.APP_DIR = _resolveClientDirectory();

/**
 * Constructs a new abstract Monitoring with the basic options.
 *
 * @constructor
 * @param {String} opts is the base application to search. Defaults to the APP directory.
 */
function MiddlewareJs(opts) {
  events.EventEmitter.call(this);

  opts = opts || {};
  this.fromDir = opts.fromDir || _resolveClientDirectory();
}
util.inherits(MiddlewareJs, events.EventEmitter);

/**
 * Loads a middleware from the ISP directory. Anything that APP_DIR/middleware/isp/ispModuleName:
 * If the middleware containers the component, return it, or else return the entire module.
 *
 * * APP/middleware/isp/ispModuleName.js
 * * APP_DIR/middleware/isp/ispModuleName/index.js
 *
 * * Simple: The middleware itself is an instance of a resolved object.
 *
 * module.exports = {}
 *
 * * composed: Explicitly declares the components in the middleware: "instance", "class".
 *
 * * "instance": is the same object instance/singleton value of the middleware.
 * * "class": The class of the middleware to be used, say  ISPLogging, ISPConf.
 *
 * module.exports.instance = {}
 * module.exports.class = new ISPCore();
 *
 * @param {String} modulePath The name of the module to fetch the settings from.
 * @param {String} [component] the type of module being loaded. Defaults to "instance".
 * @return {Object} an instance of a module from the middleware directory.
 */
MiddlewareJs.prototype.load = function load(modulePath) {
  // If the module is not provided, return undefined.
  if (!modulePath) {
    return;
  }

  // Will look for APP_DIR/middleware/isp/ispModuleName
  var middlewarePath = _getMiddlewarePath(this.fromDir, modulePath);

  try {
    // Attempting to load the isp.logging property from the config middleware
    return require(middlewarePath);

  } catch (loadingError) {
    var unknownError = new Error("Cannot load middleware '" + modulePath + "'");
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
 * getMiddlewarePath("middleware/logger");
 * getMiddlewarePath("middleware.logger");
 * Returns the directory path "APP/middleware/logger"
 */
function _getMiddlewarePath(fromDir, modulePath) {
  modulePath = modulePath.indexOf(".") > -1 ? modulePath.replace(/\./g, "/") : modulePath;
  return path.resolve(fromDir, modulePath);
}
