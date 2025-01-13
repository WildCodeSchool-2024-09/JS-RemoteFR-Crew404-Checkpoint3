// Import required dependencies
import "dotenv/config";

import supertest from "supertest";

import databaseClient from "../database/client";

import app from "../src/app";
import boatRepository from "../src/modules/boat/boatRepository";

describe("GET /api/boats?name=Black Pearl", () => {
  test("you added a 'where' parameter to method readAll() in BoatRepository, which is null by default", async () => {
    expect(boatRepository.readAll).toHaveLength(0);
  });
  test("your method readAll() returns all boats if where is null", async () => {
    const rows = await boatRepository.readAll();

    expect(rows).toHaveLength(4);
  });
  test("otherwise, you used 'where.name' in the SQL request", async () => {
    const rows = await boatRepository.readAll({ name: "Black Pearl" });

    expect(rows).toHaveLength(1);
  });
  test("you used 'req.query' to build a where object passed as argument to boatRepository.readAll() in boatActions.js", async () => {
    const response = await supertest(app).get("/api/boats?name=Black%20Pearl");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveLength(1);
  });
});

afterAll((done) => {
  databaseClient.end().then(done);
});
