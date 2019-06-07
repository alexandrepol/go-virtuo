const supertest = require("supertest");
const should = require("should");

const server = supertest.agent("http://localhost:3000");

describe("CRUD Stations Testing", function(){  
    it("should get a list of cars", function(done){
      server
      .get("/api/stations/")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res){
        res.status.should.equal(200);
        res.body.data.should.be.instanceof(Array)
        done();
      });
    });

    it("should return at least 3 letters for Name", function(done){
      server
      .post("/api/stations/")
      .send({name : "St"})
      .expect("Content-type",/json/)
      .expect(400) // THis is HTTP response
      .end(function(err, res){
        res.text.should.equal("Name should be at least 3 characters!");
        done();
      });
    });
  });