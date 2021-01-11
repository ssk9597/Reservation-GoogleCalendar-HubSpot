const router = require('express').Router();

router.post('/reserve', (req, res) => {
    try {
        const { google } = require('googleapis');
        const file = './googleCalendar.json';
        const calendarID = req.body.calendarID;

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
            //こちらを追加するとエラーが発生するため一時期コメント化
            // attendees: [{ email: req.body.attendees1 }, { email: req.body.attendees2 }],
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
        const jwt = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            scope
            // 'wor.ryosasaki@gmail.com',
            // '106451966808694779138'
        );
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
