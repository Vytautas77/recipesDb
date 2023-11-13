const request = require("supertest");
const app = require("./app");

// eslint-disable-next-line no-undef
describe("GET /recipes", () => {
  // eslint-disable-next-line no-undef
  it("Should be return with response", (res) => {
    request(app)
      .get("/recipes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, res);
  });
});

// eslint-disable-next-line no-undef
describe("POST /recipes", () => {
  // eslint-disable-next-line no-undef
  it("Should be return with response", (res) => {
    request(app)
      .get("/recipes")
      .set("Accept", "application/json")
      .send({
        title: "Test",
        category: "Test",
        date: "Test",
        author: "TEST",
        image: "TEST",
        content: "Test",
        titleIngredients: ["Task 1", "Task 2"],
        titleMarinateIngredients: ["task 1", "Task 2"],
        description: "Test",
        comments: ["Task 1", "Task 2"],
      })
      .expect("Content-Type", /json/)
      .expect(200, res);
  });
});
