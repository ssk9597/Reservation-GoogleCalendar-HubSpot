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
const reserveRoutes = require('./routes/reserve');

app.use('/api', reserveRoutes);

app.listen(5000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('サーバーを接続しました');
    }
});
