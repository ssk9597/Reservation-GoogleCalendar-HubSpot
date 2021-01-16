const router = require('express').Router();

//POST-- HubSpotに登録する
router.post('/hubspot', (req, res) => {
    try {
        const request = require('request');

        const options = {
            method: 'POST',
            url: 'https://api.hubapi.com/contacts/v1/contact/',
            qs: {
                // hapikey: process.env.HUBSPOT_KEY,
                hapikey: '90011383-1fb0-42f7-9333-1b6144569e32',
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
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;
