const supertest = require("supertest");
const should = require("should");

const server = supertest.agent("http://localhost:3000");

describe("CRUD Stations Testing",function(){  
    it("should get a list of cars",function(done){
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
  });