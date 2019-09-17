
// specify to server.js that this should be using local db
process.env.NODE_ENV = "test";

let server = require("../server");
let mongoose = require("mongoose");
let User = require("../api/models/UserModel"); // model used to prune collection before starting

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

/*
TEST STRUCTURE

-- test grouping
describe()

    -- individual tests
    it()
        chai.request()
            xx.should.xx()
            done()

*/


// Users test cases
describe("Users", () => {

    // remove all previous data in users collection
    before((done) => {
        User.deleteMany({}, (req) => {
            done();
        });
    });

    // get an empty array of users
    it("should get empty array", (done) => {
        chai.request(server)
            .get("/users")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });


    // create user with unique username
    it("should create a user", (done) => {

        let newUser = {
            username: "testusername",
            email: "test@test.com",
            password: "password123"
        }

        chai.request(server)
            .post("/users")
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a.property("token").that.is.not.empty;
                res.body.should.have.a.property("auth").that.is.eql(true);
                done();
            });
    });


    // create user with non-unique username
    it("should not create a user", (done) => {

        let newUser = {
            username: "testusername",
            email: "test@test.com",
            password: "password123"
        }

        chai.request(server)
            .post("/users")
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
    });


    // get non empty array
    it("should return an array of users", (done) => {
        chai.request(server)
            .get("/users")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.above(0);
                done();
            });

    });


    // get a specific user
    it("should return a specific user", (done) => {
        chai.request(server)
            .get("/users/testusername")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    // get a specific user not in the database
    it("should not return any users", (done) => {
        chai.request(server)
            .get("/users/testusername1")
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });


});



