/**
 * Unit testing using Mocha and Chai
 *
 * Resources:
 * https://www.youtube.com/watch?v=MLTRHc5dk6s
 * https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
 */

// Set env variable to 'test' during testing.
//process.env.NODE_ENV = "test";

// Use Chai rather than default assert package.
const assert = require("chai").assert;

// Other Chai packages
const chai = require("chai");
const chaiHttp = require("chai-http");
//const should = chai.should();
const should = require("should");

const mongoose = require("mongoose");

// Import the server.js file.
const server = require("../server");

// Import models
const User = require("../api/models/UserModel");
const Post = require("../api/models/PostModel");

// Use chaiHttp
chai.use(chaiHttp);

// Tests: //

// Just to see if the testing is working.
describe("Server", () => {
  it("Should return 'testing'", () => {
    assert.equal(server, "testing");
  });
});

// Dummy data for test user
const testUser = {
  username: "test",
  password: "Test123!",
  email: "test@email.com"
};

// Test Cases for 'User'
describe("Users", () => {
  // Empty the database before each test.
  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });

  it("it should return an empty array of User objects", done => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        should(res.status).be.equal(200);
        should(res.body).be.a("array");
        should(res.body.length).be.eql(0);
        // res.should.have.status(200);
        // res.body.should.be.a("array");
        // res.body.length.should.be.eql(0);
        done();
      });
  });
});

// Test Cases for 'Post'
describe("Post", () => {});
