//modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// const PORT = process.env.PORT || 5000;

// const config = require('./config.json')[app.get('env')];
// console.log(config.host);

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//requestAPI
const calendarRoutes = require('./routes/calendar');
const hubSpotRoutes = require('./routes/hubSpot');

app.use('/api', calendarRoutes);
app.use('/api', hubSpotRoutes);

// app.listen(PORT, err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('サーバーを接続しました');
//     }
// });

module.exports = {
    path: '/server',
    handler: app,
};
