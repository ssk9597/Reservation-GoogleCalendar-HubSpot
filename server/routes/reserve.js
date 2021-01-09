const router = require('express').Router();

router.post('/reserve', (req, res) => {
    console.log(req.body);
    try {
        const { google } = require('googleapis');
        const file = './googleCalendar.json';
        const calendarID = 'a7lmn19dksunu1n4bc2b9b9mc8@group.calendar.google.com';

        const event = {
            summary: req.body.summary,
            location: req.body.location,
            description: req.body.description,
            start: {
                dateTime: req.body.start,
                timeZone: 'Asia/Tokyo',
            },
            end: {
                dateTime: req.body.end,
                timeZone: 'Asia/Tokyo',
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 10 },
                ],
            },
        };

        process.env.GOOGLE_APPLICATION_CREDENTIALS = file;
        const key = require(file);
        const scope = [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
        ];
        const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scope);
        const calendar = google.calendar('v3');

        jwt.authorize((err, response) => {
            calendar.events.insert(
                {
                    auth: jwt,
                    calendarId: calendarID,
                    resource: event,
                },
                (err, event) => {
                    if (err) {
                        console.log('エラー：' + err);
                        return;
                    }
                    console.log('予定を登録しました');
                }
            );
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;
