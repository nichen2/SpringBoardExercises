const express = require('express');
const app = express();
const ExpressError = require("./expressError")

app.get('/mean', function(request, response, next) {
    try {
        let nums = request.query.nums;
        if (!nums) {
            throw new ExpressError("No numbers provided!", 400);
        }
        nums = nums.split(",").map(Number);
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
    try {
        let nums = request.query.nums;
        if (!nums) {
            throw new ExpressError("No numbers provided!", 400);
        }
        nums = nums.split(",").map(Number);
        nums.sort((a,b) => a - b);
        if (!(checkInt(nums))) {
            throw new ExpressError("Query list contains non-number!", 400);
        }
        let value = 1;
        if (nums.length % 2 == 0) {
            value = nums[nums.length/2 - 1] + nums[nums.length/2]
            value /= 2;
        } else {
            value = nums[Math.floor(nums.length/2)];
        }
        return response.json({operation:"median",value:value});
    } catch (err) {
        return next(err);
    }
});

app.get('/mode', function(request, response, next) {
    try {
        let nums = request.query.nums;
        if (!nums) {
            throw new ExpressError("No numbers provided!", 400);
        }
        nums = nums.split(",").map(Number);
        if (!(checkInt(nums))) {
            throw new ExpressError("Query list contains non-number!", 400);
        }
        let mode = 0;
        let max = 0;
        const countMap = {};
        nums.forEach((x) => {
            if (isNaN(countMap[x])) {
                countMap[x] = 1;
            } else {
                countMap[x] += 1;
                if (countMap[x] > max) {
                    max = countMap[x];
                    mode = x;
                }
            }
        })
        return response.json({operation:"mode",value:mode});
    } catch (err) {
        return next(err);
    }
});

function checkInt(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (isNaN(arr[i])) return false;
    }
    return true;
}

app.use((error, req, res, next) => {
    res.status(error.status).send(error.message);
});

app.listen(3000, function() {
    console.log('App on port 3000');
});