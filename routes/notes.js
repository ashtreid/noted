const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/rwUtils');

// Handles GET requests to the root path by reading the contents of './db/db.json' file,
// parsing the data as JSON, and sending it as the response
notes.get('/', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Extracts the id from the request, then filters the array of notes 
// to find the matching id. If a matching id is found, it is sent in
// the response. Otherwise, an error is sent.
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID');
        });
});

// Deletes by finding and filtering out the matching id and then 
// re-writes to the file without the found id.
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Deleted ${noteId}`);
      });
});

// Extracts the title and text fields from the request body and then
// creates a new note object with a randomly generated ID and appends it 
// to the database file.
notes.post('/', (req, res) => {
    const { title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };

        res.json(response);
    } else {
        res.json('Error: Cannot post note');
    }
});

module.exports = notes;