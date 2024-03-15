process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testInvoice;

beforeEach(async () => {
    const companyResult = await db.query(`INSERT INTO companies (code, name, description) VALUES ('apple', 'Apple Computer', 'Maker of OSX.') RETURNING code, name, description`);
    const invoiceResult = await db.query(`INSERT INTO invoices (comp_Code, amt, paid, paid_date) 
    VALUES ('apple', 100, false, null) RETURNING add_date, amt,comp_Code, paid, id, paid_date`);
    testInvoice = invoiceResult.rows[0]
  })

afterEach(async () => {
    await db.query(`DELETE FROM invoices`)
    await db.query('DELETE FROM companies')
  })
  
afterAll(async () => {
    await db.end()
  })

describe("GET /invoices", () => {
    test("Get a list with one invoice", async () => {
        const res = await request(app).get('/invoices')
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"invoices": [{"add_date": "2024-03-15T07:00:00.000Z", "amt": 100, "comp_code": "apple", "id": expect.any(Number), "paid": false, "paid_date": null}]})
    })
})

describe("GET /invoices/:id", () => {
    test("Gets a single Invoice", async () => {
      const res = await request(app).get(`/invoices/${testInvoice.id}`)
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({"invoice": {"add_date": "2024-03-15T07:00:00.000Z", "amt": 100, "comp_code": "apple", "id": expect.any(Number), "paid": false, "paid_date": null}})
    })
    test("Responds with 404 for invalid code", async () => {
      const res = await request(app).get(`/invoices/0`)
      expect(res.statusCode).toBe(404);
    })
  })

describe("POST /invoices", () => {
    test("Creates a single invoice", async () => {
        const res = await request(app).post('/invoices').send({ comp_code: 'apple', amt: 500 });
        expect(res.statusCode).toBe(201);
    })
})

describe("PUT /invoices/:code", () => {
    test("Updates a single Invoice", async () => {
        const res = await request(app).put(`/invoices/${testInvoice.id}`).send({ amt: 200, paid: false });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"invoice": {"add_date": "2024-03-15T07:00:00.000Z", "amt": 200, "comp_code": "apple", "id": expect.any(Number), "paid": false, "paid_date": null}})
    })
    test("Responds with 404 for invalid id", async () => {
        const res = await request(app).patch(`/invoices/0`).send({ name: 'test', description: 'test patch' });
        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /invoices/:code", () => {
    test("Delete a Invoice", async () => {
        const res = await request(app).delete(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"status": "deleted"});
    })
})