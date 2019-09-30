
// specify to server.js that this should be using local db
process.env.NODE_ENV = "test";

let server = require("../server");
let mongoose = require("mongoose");

// model used to prune collection before starting
let User = require("../api/models/UserModel");
let Post = require("../api/models/PostModel");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let fs = require('fs');

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


let testuser = {
    username: "testuser",
    password: "password123",
    email: "test@test.com"
}


// Users test cases
describe("Users", () => {

    // remove all previous data in users collection
    before((done) => {
        User.deleteMany({}, (err) => {
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
        chai.request(server)
            .post("/users")
            .send(testuser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a.property("token").that.is.not.empty;
                res.body.should.have.a.property("auth").that.is.eql(true);
                done();
            });
    });

    // create user with non-unique username
    it("should not create a user", (done) => {
        chai.request(server)
            .post("/users")
            .send(testuser)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
    });

    // create user with missing data
    it("should not create a user due to missing data", (done) => {
        chai.request(server)
            .post("/users")
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    // create user with missing username
    it("should not create a user due to missing username", (done) => {
        chai.request(server)
            .post("/users")
            .send({
                password: testuser.password,
                email: testuser.email
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    // create user with missing password
    it.skip("should not create a user due to missing password", (done) => {
        chai.request(server)
            .post("/users")
            .send({
                username: testuser.username,
                email: testuser.email
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    // create user with missing email
    it.skip("should not create a user due to missing email", (done) => {
        chai.request(server)
            .post("/users")
            .send({
                username: testuser.username,
                password: testuser.password
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    // get non empty array of users
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
            .get("/users/" + testuser.username)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    // get a specific user not in the database
    it("should not return any users", (done) => {
        chai.request(server)
            .get("/users/doesnotexist")
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });


});



// login test cases
describe("Login", () => {

    // login existing user
    it("should login successfuly", (done) => {
        chai.request(server)
            .post("/login")
            .send(testuser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a.property("token").that.is.not.empty;
                res.body.should.have.a.property("auth").that.is.eql(true);
                done();
            });

    });

    // login with incorrect password
    it("should not login because of bad password", (done) => {
        chai.request(server)
            .post("/login")
            .send({
                username: testuser.username,
                password: "incorrectpassword"
            })
            .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.have.a.property("auth").that.is.eql(false);
                done();
            });
    });

    // login non-existing user
    it("should not login because user does not exist", (done) => {
        chai.request(server)
            .post("/login")
            .send({
                username: "incorrectusername",
                password: "incorrectpassword"
            })
            .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.have.a.property("auth").that.is.eql(false);
                done();
            });
    });

    // login with no data provided
    it("should not login because missing data", (done) => {
        chai.request(server)
            .post("/login")
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.have.a.property("auth").that.is.eql(false);
                done();
            });
    });

    // login with username missing
    it("should not login because missing username", (done) => {
        chai.request(server)
            .post("/login")
            .send({
                password: testuser.password
            })
            .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.have.a.property("auth").that.is.eql(false);
                done();
            });
    });

    // login with password missing
    it("should not login because of missing password", (done) => {
        chai.request(server)
            .post("/login")
            .send({
                username: testuser.username
            })
            .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.have.a.property("auth").that.is.eql(false);
                done();
            });
    });

});


describe("Posts", () => {

    // log in
    var authToken = null;

    before((done) => {
        chai.request(server)
            .post('/login')
            .send({username: testuser.username, password: testuser.password})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a.property("token").that.is.not.empty;
                // save auth token for usage by the other tests
                authToken = res.body.token;
                done();
            });
    });

    // clear all posts before testing
    before((done) => {
        Post.deleteMany({}, (err) => {
            done();
        });
    });

    // create new post with authentication
    it("should create a new post", (done) => {
        chai.request(server)
            .post("/posts")
            .set('x-access-token', authToken)
            .attach('postImage', fs.readFileSync('test/image.png'), 'image.png')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    // create new post without authentication
    it("should not create a post due to no authentication", (done) => {
        chai.request(server)
            .post("/posts")
            .attach('postImage', fs.readFileSync('test/image.png'), 'image.png')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    // create post with authentication & without image
    it("should not create a post due to missing image", (done) => {
        chai.request(server)
            .post("/posts")
            .set('x-access-token', authToken)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    // create post with incorrect key name
    it("should not create a post due to incorrect image key name", (done) => {
        chai.request(server)
            .post("/posts")
            .set('x-access-token', authToken)
            .attach('incorrectKey', fs.readFileSync('test/image.png'), 'image.png')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

});



// Comments

describe("Comments", () => {

    // log in
    var authToken = null;
    var postId = null;

    before((done) => {
        chai.request(server)
            .post('/login')
            .send({username: testuser.username, password: testuser.password})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a.property("token").that.is.not.empty;
                // save auth token for usage by the other tests
                authToken = res.body.token;
                done();
            });
    });

    // clear all posts and create one to comment on
    before((done) => {
        Post.deleteMany({}, (err) => {

            Post.create(
                {
                    author: testuser.username,
                    image_path: "test/image.png"
                },
                (err, post) => {
                    postId = post["_id"];
                    done();
            });

        });
    });

    // create new comment on post
    it('should create a new comment', (done) => {
        chai.request(server)
            .post('/comments')
            .set('x-access-token', authToken)
            .field('post_id', postId.toString())
            .attach('postImage', fs.readFileSync('test/image.png'), 'image.png')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


});
