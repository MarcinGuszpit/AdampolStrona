const express = require('express');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const {check, validationResult} = require('express-validator');
const {nodeMailerID} = require("../settings/settings");


const router = express.Router();
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: nodeMailerID
    }
}));


router.get('/', (req, res, next) => {
    res.render('./main-page/index.ejs');
});

router.post('/', (req, res, next) => {
    transporter.sendMail({
        to: 'biuro@pphu-adampol.pl',
        from: 'no-reply-form@pphu-adampol.pl',
        subject: 'Wiadomość ze strony WWW',
        html: '<span>To jest wiadomość ze strony</span>'

    }).then(() => {
        console.log('wysłanie w porządku');
    })


    res.render('error-custom-msg.ejs', {
        error: null,
        title: 'Dziękujemy za wiadomość',
        info: 'Niestety w obecnej chwili wysyłanie wiadomości nie działa. Jeżeli chcesz się skontaktować, skorzystaj z maila podanego na stronie głównej'
    });
});

module.exports = router;