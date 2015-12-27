"use strict";

var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");

var chai = require("chai");
var expect = chai.expect;

var MiddlewareJs = require("../lib/middleware");

// describing the logger variable instantiated above.
describe("Middleware.js", function() {

  before(function(done) {
    // create the middleware directory for the configuration
    var configMiddlewareDir = path.resolve(MiddlewareJs.APP_DIR, "middleware", "config");
    fse.mkdirsSync(configMiddlewareDir);

    // copy the fixture config
    var fromFile = path.resolve("./test/fixture/middleware-conf.js");
    var toFile = path.resolve(configMiddlewareDir, "index.js");
    fs.writeFileSync(toFile, fs.readFileSync(fromFile), "utf8");

    done();
  });

  after(function(done) {
    // undo the config
    fse.removeSync(path.resolve(MiddlewareJs.APP_DIR, "middleware"));

    done();
  });

  describe("Using path notation", function() {
    it("should load middleware using index file APP/middleware/config/index.js", function(done) {
      var conf = MiddlewareJs.load("middleware/config");
      expect(conf).to.be.an("object");
      expect(conf.isp.logging.console.level).to.equal("debug");
      expect(conf.isp.monitoring.type).to.equal("newrelic");
      expect(conf.superApp.server.secure).to.be.true;

      done();
    });

    it("should load middleware using from() APP/middleware/config/index.js", function(done) {
      var conf = MiddlewareJs.from(__dirname + "/..").load("middleware/config");
      expect(conf).to.be.an("object");
      expect(conf.isp.logging.console.level).to.equal("debug");
      expect(conf.isp.monitoring.type).to.equal("newrelic");
      expect(conf.superApp.server.secure).to.be.true;

      done();
    });

  });

  describe("Using the dot notation", function() {
    it("should load middleware using index file APP/middleware/config/index.js", function(done) {
      var conf = MiddlewareJs.load("middleware.config");
      expect(conf).to.be.an("object");
      expect(conf.isp.logging.console.level).to.equal("debug");
      expect(conf.isp.monitoring.type).to.equal("newrelic");
      expect(conf.superApp.server.secure).to.be.true;

      done();
    });

    it("should load middleware using from() APP/middleware/config/index.js", function(done) {
      var conf = MiddlewareJs.from(__dirname + "/..").load("middleware.config");
      expect(conf).to.be.an("object");
      expect(conf.isp.logging.console.level).to.equal("debug");
      expect(conf.isp.monitoring.type).to.equal("newrelic");
      expect(conf.superApp.server.secure).to.be.true;

      done();
    });

  });

});
