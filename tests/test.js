// test/addNumber.test.js
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app"; // Adjust the path based on your project structure

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Add Number API", () => {
  // Test to sum numbers with default delimiters
  it("should return the sum of numbers with default delimiters", (done) => {
    chai
      .request(app)
      .post("/add")
      .send({ numbers: "1,2,3" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("sum").eql(6);
        done();
      });
  });

  // Test to sum numbers with new line as delimiter
  it("should return the sum of numbers with new line and comma as delimiters", (done) => {
    chai
      .request(app)
      .post("/add")
      .send({ numbers: "1\n2,3" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("sum").eql(6);
        done();
      });
  });

  // Test to sum numbers with a custom delimiter
  it("should return the sum of numbers with a custom delimiter", (done) => {
    chai
      .request(app)
      .post("/add")
      .send({ numbers: "//;\n1;2;3" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("sum").eql(6);
        done();
      });
  });

  // Test to handle negative numbers
  it("should return an error for negative numbers", (done) => {
    chai
      .request(app)
      .post("/add")
      .send({ numbers: "1,-2,3" })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have
          .property("error")
          .eql("Negative numbers not allowed: -2");
        done();
      });
  });

  // Test to handle multiple negative numbers
  it("should return an error for multiple negative numbers", (done) => {
    chai
      .request(app)
      .post("/add")
      .send({ numbers: "1,-2,-3,4" })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have
          .property("error")
          .eql("Negative numbers not allowed: -2, -3");
        done();
      });
  });

  // Test to handle empty input
  it("should return 0 for empty input", (done) => {
    chai
      .request(app)
      .post("/add")
      .send({ numbers: "" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("sum").eql(0);
        done();
      });
  });
});
