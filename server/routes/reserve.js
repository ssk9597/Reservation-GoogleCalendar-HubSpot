const router = require('express').Router();

router.post('/reserve', (req, res) => {
    try {
        res.json({
            success: true,
            message: '成功しました',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;
