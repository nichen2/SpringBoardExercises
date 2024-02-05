const fs = require('fs');
const argv = process.argv;
const path = argv[2]

function cat(path) {
    fs.readFile(path,'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
        }
        console.log("Reading File:", data)
    })
}

cat(path)