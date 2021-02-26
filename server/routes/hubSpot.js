const express = require('express');
const router = require('express').Router();

const app = express();

//POST-- HubSpotに登録する
router.post('/hubspot', (req, res) => {
    try {
        const request = require('request');

        const hubSpot_KEY = require('./hubspot.json')[app.get('env')].HubSpot_KEY;

        const options = {
            method: 'POST',
            url: 'https://api.hubapi.com/contacts/v1/contact/',
            qs: {
                hapikey: hubSpot_KEY,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                properties: [
                    { property: 'email', value: req.body.email },
                    { property: 'firstname', value: req.body.firstName },
                    { property: 'lastname', value: req.body.lastName },
                ],
            },
            json: true,
        };
        request(options, (err, body) => {
            if (err) {
                throw new Error(err);
            }
            console.log('HubSpotに登録しました');
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;
