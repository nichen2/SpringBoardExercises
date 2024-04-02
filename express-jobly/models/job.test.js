"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  getJobId,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "new",
    salary: 1,
    equity: 0,
    company_handle: "c1",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual({
        id: expect.any(Number),
        title: "new",
        salary: 1,
        equity: "0",
        companyHandle: "c1",
    });

    const result = await db.query(
          `SELECT id, title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`, [job.id]);
    expect(result.rows).toEqual([
      {
        id: job.id,
        title: "new",
        salary: 1,
        equity: "0",
        companyHandle: "c1",
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
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
        companyHandle: "c3",
      },
    ]);
  });
});

/************************************** filterBy */

describe("filterBy", function () {
  test("works: with 1 filter", async function () {
    let params = {title: "j"}
    let jobs = await Job.filterBy(params);
    expect(jobs).toEqual([
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
        companyHandle: "c3",
      },
    ]);
  });

  test("works: with all filters", async function () {
    let params = {title: "j", minSalary: 2, hasEquity: false}
    let jobs = await Job.filterBy(params);
    expect(jobs).toEqual([
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
        companyHandle: "c3",
      },
    ]);
  });

  test("works: with min salary", async function () {
    let params = {minSalary: 3}
    let jobs = await Job.filterBy(params);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j3", 
        salary: 3, 
        equity: "0.3", 
        companyHandle: "c3",
      },
    ]);
  });

  test("works: with equity", async function () {
    let params = {title: "j", minSalary: 1, hasEquity: true}
    let jobs = await Job.filterBy(params);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j1", 
        salary: 1, 
        equity: "1", 
        companyHandle: "c1",
      },
      {
        id: expect.any(Number),
        title: "j3", 
        salary: 3, 
        equity: "0.3", 
        companyHandle: "c3",
      },
    ]);
  });

  test("works: filters random order", async function () {
    let params = {minSalary: 3, hasEquity: true, title: "j"}
    let jobs = await Job.filterBy(params);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j3", 
        salary: 3, 
        equity: "0.3", 
        companyHandle: "c3",
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    const id = await getJobId();
    let job = await Job.get(id);
    expect(job).toEqual({
        id: id,
        title: "j1",
        salary: 1,
        equity: "1",
        companyHandle: "c1",
    });
  });

  test("not found if no such company", async function () {
    try {
      await Job.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    title: "new",
    salary: 5,
    equity: 0,
    company_handle: "c3",
  };

  test("works", async function () {
    const id = await getJobId();
    let job = await Job.update(id, updateData);

    expect(job).toEqual({
      id: expect.any(Number),
      title: "new",
      salary: 5,
      equity: "0",
      companyHandle: "c3",
    });

    const result = await db.query(
          `SELECT id, title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`,[job.id]);
    expect(result.rows).toEqual([{
      id: job.id,
      title: "new",
      salary: 5,
      equity: "0",
      companyHandle: "c3",
    }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
        title: "new",
        salary: null,
        equity: null,
        company_handle: "c3",
    };

    const id = await getJobId();
    let job = await Job.update(id, updateDataSetNulls);

    expect(job).toEqual({
      id: expect.any(Number),
      title: "new",
      salary: null,
      equity: null,
      companyHandle: "c3",
    });

    const result = await db.query(
          `SELECT id, title, salary, equity, company_handle AS "companyHandle"
          FROM jobs
          WHERE id = $1`,[job.id]);
    expect(result.rows).toEqual([{
      id: job.id,
      title: "new",
      salary: null,
      equity: null,
      companyHandle: "c3",
    }]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(0, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update("c1", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    const id = await getJobId();
    await Job.remove(id);
    const res = await db.query(
        "SELECT id FROM jobs WHERE id=$1",[id]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
      await Job.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
