"use strict";

var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");

var chai = require("sp-quality/test").chai();
var expect = chai.expect;

var MiddlewareJs = require("../lib/middleware");

// describing the logger variable instantiated above.
describe("Middleware.js Loader with Names", function() {

  beforeEach(function(done) {
    // create the middleware directory for the configuration
    var configMiddlewareDir = path.resolve(MiddlewareJs.APP_DIR, "middleware");
    fse.mkdirsSync(configMiddlewareDir);

    // copy the fixture config
    var fromFile = path.resolve("./test/fixture/middleware-conf.js");
    var toFile = path.resolve(configMiddlewareDir, "config.js");
    fs.writeFileSync(toFile, fs.readFileSync(fromFile), "utf8");

    done();
  });

  afterEach(function(done) {
    // undo the config
    fse.removeSync(path.resolve(MiddlewareJs.APP_DIR, "middleware"));

    done();
  });

  it("should load middleware using dot notation and index file APP/middleware/config.js", function(done) {
    var conf = MiddlewareJs.instance().load("middleware.config");
    expect(conf).to.be.an("object");
    expect(conf.isp.logging.console.level).to.equal("debug");
    expect(conf.isp.monitoring.type).to.equal("newrelic");
    expect(conf.superApp.server.secure).to.be.true;

    done();
  });
});
