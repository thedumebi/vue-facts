process.env.NODE_ENV = "test";

import chai from "chai";
import assert from "assert";
import chaiHttp from "chai-http";
import server from "../index.js";
import model from "../models/index.js";

const Facts = model.Facts;
const should = chai.should();

chai.use(chaiHttp);

describe("Facts", (done) => {
  describe("Get all facts from api", () => {
    it("successfully get all facts", (done) => {
      chai
        .request(server)
        .get("/fromSource")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].should.be.a("object");
          res.body[0].should.have.property("_id");
          done();
        });
    });
  });

  describe("Add fact to database", () => {
    it("successfully add a fact to db", async () => {
      const fact = await Facts.create({
        _id: "1",
        text: "Initial text",
      });
      assert.strictEqual(fact._id, "1");
    });
  });

  describe("Edit fact in database", () => {
    it("successfully edits an item in db", async () => {
      let fact = await Facts.findByPk("1");
      assert.strictEqual(fact.text, "Initial text");

      await fact.update({ text: "Updated text" });
      assert.strictEqual(fact.text, "Updated text");
    });
  });

  describe("Delete fact in database", () => {
    it("successfully deletes item in db", async () => {
      let fact = await Facts.findByPk("1");

      assert.strictEqual(fact.text, "Updated text");
      await fact.destroy();
      const checkFact = await Facts.findByPk("1");
      assert.equal(checkFact, null);
    });
  });
});
