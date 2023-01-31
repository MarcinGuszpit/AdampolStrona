const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('./main-page/index.ejs');
});

router.post('/', (req, res, next) => {
    res.render('error-custom-msg.ejs', {
        error: null,
        title: 'Dziękujemy za wiadomość',
        info: 'Niestety w obecnej chwili wysyłanie wiadomości nie działa. Jeżeli chcesz się skontaktować, skorzystaj z maila podanego na stronie głównej'
    });
});

module.exports = router;