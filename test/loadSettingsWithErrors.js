"use strict";

var chai = require("chai");
var expect = chai.expect;

var MiddlewareJs = require("../lib/middleware");

var path = require("path");
var currentDir = path.resolve(__dirname, "..");

// describing the logger variable instantiated above.
describe("Middleware.js with Errors", function() {

  it("should not load anything when not providing options", function(done) {
    var conf = MiddlewareJs.require();
    expect(conf).to.be.undefined;

    done();
  });

  it("should throw an error when giving a non-existing middleware using path/to/middleware", function(done) {
    try {
      MiddlewareJs.require("does/not/exist");

    } catch (middlewareNotLoaded) {
      expect(middlewareNotLoaded).not.be.be.null;

      expect(middlewareNotLoaded.message).to.equal("Cannot find middleware '" + currentDir + "/does/not/exist'");
    }

    done();
  });

  it("should throw an error when giving a non-existing middleware using dot.notation.to.middleware", function(done) {
    try {
      MiddlewareJs.require("com.github.service");

    } catch (middlewareNotLoaded) {
      expect(middlewareNotLoaded).not.be.be.null;
      expect(middlewareNotLoaded.message).to.equal("Cannot find middleware '" + currentDir + "/com/github/service'");
    }

    done();
  });

});
