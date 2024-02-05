const fs = require('fs');
const axios = require('axios');
const { error } = require('console');
const argv = process.argv;
const path = argv[2]
let outFile;
let newPath;

if (path == '--out') {
    try {
        outFile = argv[3];
        newPath = argv[4];
    } catch(err) {
        console.log('Missing input', error);
    }
    if (newPath.includes('.txt')) {
        catWrite(outFile,newPath);
    } else {
        webCatWrite(outFile,newPath);
    }
} else if (path.includes('.txt')) {
    cat(path);
} else {
    webCat(path);
}

function cat(path) {
    fs.readFile(path,'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
        }
        console.log(`Reading file ${path}:`, data)
    })
}

function catWrite(outFile,newPath) {
    let writeData;
    fs.readFile(newPath,'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
        }
        writeData = data;
        fs.writeFile(outFile, writeData, 'utf-8', err => {
            if (err) {
                console.log("Error:", err);
                process.kill(1);
            }
        })
    })
}

async function webCat(path) {
    try {
        const res = await axios.get(path);
        console.log(`Fetching ${path}`,res.data);
    } catch (error) {
        console.error(`Error fetching ${path}`,error);
    }
}

async function webCatWrite(outFile,newPath) {
    try {
        const res = await axios.get(newPath);
        fs.writeFile(outFile, res.data, 'utf-8', err => {
            if (err) {
                console.log("Error:", err);
                process.kill(1);
            }
        })
    } catch (error) {
        console.error(`Error fetching ${path}`,error);
    }
}

