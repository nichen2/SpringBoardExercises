const fs = require('fs');
const axios = require('axios');
const argv = process.argv;
const path = argv[2]

async function webCat(path) {
    try {
        const res = await axios.get(path);
        console.log(`Fetching ${path}`,res.data);
    } catch (error) {
        console.error(`Error fetching ${path}`,error);
    }
}

function cat(path) {
    fs.readFile(path,'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
        }
        console.log(`Reading file ${path}:`, data)
    })
}

if (path.includes('.txt')) {
    cat(path);
}
else {
    webCat(path);
}