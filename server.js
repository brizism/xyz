const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // access data with req.body

const users = require('./routes/api/users');
const summary = require('./routes/api/summary');
const entry = require('./routes/api/entry');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello!'));

// Use Routes
app.use('/api/users', users);
app.use('/api/summary', summary);
app.use('/api/entry', entry);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));