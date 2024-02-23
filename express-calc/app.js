const express = require('express');
const app = express();
const ExpressError = require("./expressError")

app.get('/mean', function(request, response, next) {
    try {
        let nums = request.query.nums;
        nums = nums.replaceAll(",",""); // remove commas from string
        nums = Array.from(nums, (x) => Number(x))
        if (!(checkInt(nums))) {
            throw new ExpressError("Query list contains non-number!", 400);
        }
        let total = 0;
        nums.forEach((x) => total += x);
        const value = total/nums.length
        return response.json({operation:"mean",value:value});
    } catch (err) {
        return next(err);
    }
    
});

app.get('/median', function(request, response, next) {
    return response.send("This route returns the median");
});

app.get('/mode', function(request, response, next) {
    return response.send("This route returns the mode");
});

function checkInt(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isNan) return false;
    }
    return true;
}

app.listen(3000, function() {
    console.log('App on port 3000');
});