const express = require('express');
const router = express.Router();
const items = require('./fakeDb'); // Not used in this example, but here for future use
const ExpressError = require('./expressError');

// render a list of shopping items.
router.get("", function(req, res) {
    return res.json(items);
});

// accept JSON data and add it to the shopping list.
router.post("", function(req, res) {
    const {name, price} = req.body;
    if (name === undefined || price === undefined) {
        throw new ExpressError("Please enter a valid name and price", 404);
    }
    const newItem = {name, price};
    items.push(newItem);

    return res.json({"added":newItem});
});

// display a single item’s name and price.
router.get("/:name", function(req, res) {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    return res.json(foundItem);
});
// {“name”: “popsicle”, “price”: 1.45}

// modify a single item’s name and/or price.
router.patch("/:name", function(req, res) {
    let foundItem = items.find(item => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    const {name, price} = req.body;
    if (name === undefined || price === undefined) {
        throw new ExpressError("Please enter a valid name and price", 404);
    }
    foundItem.name = name;
    foundItem.price = price;
    return res.json({"updated": foundItem});
});
// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

// delete a specific item from the array.
router.delete("/:name", function(req, res) {
    const index = items.findIndex(item => item.name === req.params.name);
    if (index === -1) {
        throw new ExpressError("Item to delete not found", 404);
    }
    items.splice(index, 1);
    return res.json({message:"Deleted"});
})
// {message: “Deleted”}


module.exports = router;
