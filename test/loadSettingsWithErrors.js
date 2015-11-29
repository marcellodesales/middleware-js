"use strict";

var chai = require("sp-quality/test").chai();
var expect = chai.expect;

var MiddlewareJs = require("../lib/middleware");

// describing the logger variable instantiated above.
describe("Middleware.js with Errors", function() {

  it("should not load anything when not providing options", function(done) {
    var conf = MiddlewareJs.instance().load();
    expect(conf).to.be.undefined;

    done();
  });

  it("should throw an error when giving a non-existing middleware", function(done) {
    try {
      MiddlewareJs.instance().load("does/not/exist");

    } catch (middlewareNotLoaded) {
      expect(middlewareNotLoaded).to.be.an("Object");
    }

    done();
  });

});