//modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//requestAPI
const calendarRoutes = require('./routes/calendar');
const hubSpotRoutes = require('./routes/hubSpot');

app.use('/', calendarRoutes);
app.use('/', hubSpotRoutes);

app.get('/index', (req, res) => {
    res.json('Hello World');
});

module.exports = {
    path: '/api',
    handler: app,
};
