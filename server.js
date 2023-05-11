const express = require('express');
const path = require('path');
const { midware } = require('./middleware/midware');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(midware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Handles GET requests for "/notes" by sending the "notes.html" file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Handles all other GET requests by sending the "index.html" file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT} 🚀`));