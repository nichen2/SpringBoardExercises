"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token, // Admin
  u2Token, // Regular user/Non-admin
  getJobId,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    title: "new",
    salary: 1,
    equity: 0,
    company_handle: "c1",
  };

  test("ok for admin", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title: "new",
        salary: 1,
        equity: "0",
        companyHandle: "c1",
      }
    });
  });

  test("bad request with non-admin user", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          title: "new",
          salary: 1,
          equity: 0,
          company_handle: "c1",
        })
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          title: "new",
          company_handle: "c1",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          title: "new",
          salary: 1,
          equity: "1.0",
          company_handle: "c1",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs:
          [
            {
              id: expect.any(Number),
              title: "j1", 
              salary: 1, 
              equity: "1", 
              companyHandle: "c1",
            },
            {
              id: expect.any(Number),
              title: "j2", 
              salary: 2, 
              equity: "0", 
              companyHandle: "c2",
            },
            {
              id: expect.any(Number),
              title: "j3", 
              salary: 3, 
              equity: "0.3", 
              companyHandle: "c2",
            },
          ],
    });
  });

  test("ok filters", async function () {
    const resp = await request(app).get("/jobs?title=3&minSalary=2&equity=true");
    expect(resp.body).toEqual({
      jobs:
          [
            {
              id: expect.any(Number),
              title: "j3", 
              salary: 3, 
              equity: "0.3", 
              companyHandle: "c2",
            },
          ],
    });
  });

  test("ok filter returns no results", async function () {
    const resp = await request(app).get("/jobs?minSalary=5");
    expect(resp.body).toEqual({
      jobs: []
    });
  });

  test("fails: minSalary is negative", async function () {
    const resp = await request(app).get("/jobs?minSalary=-3");
    expect(resp.statusCode).toEqual(400);
  });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE jobs CASCADE");
    const resp = await request(app)
        .get("/jobs")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    const id = await getJobId();
    const resp = await request(app).get(`/jobs/${id}`);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title: "j1",
        salary: 1,
        equity: "1",
        companyHandle: "c1",
      },
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/${0}`);
    expect(resp.statusCode).toEqual(404);
  });
});

// /************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
  test("works for admin", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .patch(`/jobs/${id}`)
        .send({
          title: "J1-new",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title: "J1-new",
        salary: 1,
        equity: "1",
        companyHandle: "c1",
      },
    });
  });

  test("unauth for non admin", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .patch(`/jobs/${id}`)
        .send({
          title: "C1-new",
        })
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .patch(`/jobs/${id}`)
        .send({
          title: "C1-new",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such company", async function () {
    const resp = await request(app)
        .patch(`/jobs/${0}`)
        .send({
          title: "new nope",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on id change attempt", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .patch(`/jobs/${id}`)
        .send({
          id: 1,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .patch(`/jobs/${id}`)
        .send({
          equity: "1",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /jobs/:id */

describe("DELETE /jobs/:id", function () {
  test("works for admin", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .delete(`/jobs/${id}`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: expect.any(String) });
  });

  test("unauth for non admin", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .delete(`/jobs/${id}`)
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const id = await getJobId();
    const resp = await request(app)
        .delete(`/jobs/${id}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such job", async function () {
    const resp = await request(app)
        .delete(`/jobs/0`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
