function isLoggedIn(req,res,next) {
    if (req.session.loggedIn && req.session.email) {
        next();
    }
    else {
        res.render('error-custom-msg.ejs', {
            error: {
                title: 'Błąd 405',
                msg: 'Brak uprawnień!'
            },
            title: null,
            info: 'Nie możesz przejść na wybraną stronę bez logowania',
            link: '/login',
            linkMessage: 'Przejdź do strony logowania'

        });
    }
}

module.exports = {
    isLoggedIn
}