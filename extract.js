const fs = require('fs');
const pdf = require('pdf-parse');

async function run() {
    try {
        const fetch = global.fetch; 
        console.log("Fetching PDF...");
        const res = await fetch("https://drive.google.com/uc?export=download&id=1AzZ8LE9B6So3RJFd4YtSxmZcxtjTfiPp");
        const buf = await res.arrayBuffer();
        console.log("Parsing PDF...");
        const data = await pdf(Buffer.from(buf));
        console.log("----- RESUME CONTENT -----");
        console.log(data.text);
        console.log("--------------------------");
    } catch(e) {
        console.error(e);
    }
}

run();