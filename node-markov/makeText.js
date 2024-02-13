const fs = require('fs');
const axios = require('axios');
const { error } = require('console');
const {MarkovMachine} = require('./markov');
const argv = process.argv;
const path = argv[2];
const path2 = argv[3];

function markovFile(path) {
    fs.readFile(path,'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
        }
        let mm = new MarkovMachine(data);
        let text = mm.makeText(numWords = 1000);
        console.log(text);
    })
}

async function markovWeb(path) {
    try {
        const res = await axios.get(path);
        let mm = new MarkovMachine(res.data);
        let text = mm.makeText(numWords = 1000);
        console.log(text);
    } catch (error) {
        console.error(`Error fetching ${path}`,error);
    }
}

if (path === 'file') {
  markovFile(path2);
} else {
    markovWeb(path2);
}