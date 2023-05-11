const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

// Adds content to the desired file.
const writeToFile = (file, content) => 
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) => 
        err ? console.error(err) : console.info(`\nWritten to ${file}`)
    );

// Reads the file, parses it, and then sends it to `writeToFile`
// to add it to the intended file.
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend }