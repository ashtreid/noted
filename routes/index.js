const express = require('express');

const notesRouter = require('./notes');

const app = express();

// Mount the notesRouter middleware at the '/notes' path
app.use('/notes', notesRouter);

module.exports = app;