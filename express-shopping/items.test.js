const request = require("supertest");

const app = require("./app")
let items = require("./fakeDb")

let item1 = {name:"popsicle", price:1.45};
let item2 = {name:"cake", price:5.00};
let item3 = {name:"chocolate", price:2.50};

beforeEach(function () {
    items.push(item1);
    items.push(item2);
    items.push(item3);
});

afterEach(function () {

    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{"name": "popsicle", "price": 1.45}, {"name": "cake", "price": 5}, {"name": "chocolate", "price": 2.5}]);
    })
})

describe("POST /items", () => {
    test("Insert an item", async () => {
        const res = await request(app).post("/items").send({name:"candybar",price:3.15});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"added": {"name": "candybar", "price": 3.15}});
    })
    test("Inserting a non-item", async () => {
        const res = await request(app).post("/items").send({name:undefined,price:undefined});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error": "Please enter a valid name and price"});
    })
})

describe("GET /items/:name", () => {
    test("Get a specific item", async () => {
        const res = await request(app).get("/items/popsicle");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"name": "popsicle", "price": 1.45});
    })
    test("Error handling for non-item", async () => {
        const res = await request(app).get("/items/nothing");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error": "Item not found"});
    })
})

describe("PATCH /items/:name", () => {
    test("Updating an item's name and price", async () => {
        const res = await request(app)
            .patch("/items/popsicle")
            .send({name: "new popsicle", price: 2.45});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"updated": {"name": "new popsicle", "price": 2.45}});
    });

    test("Error handling for updating a non-existent item", async () => {
        const res = await request(app)
            .patch("/items/nonexistentitem")
            .send({name: "invisible cake", price: 4.99});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error": "Item not found"});
    });

    test("Error for incomplete item update data", async () => {
        const res = await request(app)
            .patch("/items/chocolate")
            .send({name: undefined, price: undefined});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error": "Please enter a valid name and price"});
    });
})

describe("DELETE /items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete("/items/new popsicle"); // Assuming "new popsicle" was added from the previous test
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"});
    });

    test("Error handling for deleting a non-existent item", async () => {
        const res = await request(app).delete("/items/nonexistentitem");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error": "Item to delete not found"});
    });
})
