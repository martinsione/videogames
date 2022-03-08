import supertest from "supertest";
import app from "../app";

const api = supertest(app);

test("should return data as json", () => {
  api.get("/genres").expect(200).expect("Content-Type", /json/);
});

test("Should return all genres", async () => {
  const res = await api.get("/genres");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(19);
});
