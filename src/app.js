const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const data = require('./model/data');
//routes

const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');
const adminRoutesAdditionalSettings = require('./routes/admin-settings');
const adminRoutesTexts = require('./routes/admin-texts');

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'To_jest_jakiś_sekretny_klucz_QWZx!23#',
    resave: false,
    saveUninitialized: false
}));
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(express.static(path.join(__dirname, 'static')));

app.use(adminRoutesAdditionalSettings);
app.use(adminRoutesTexts);
app.use(adminRoutes);
app.use(mainRoutes);

app.get('/template_test', (req, res) => {
    console.log(data.user)
    const page = {
        id: 'ustawienia',
        link: 'settings',
        menuTitle: 'Ustawienia',
        pageTitle: 'Administrator - ustawnienia',
        subTitle: 'Dodatkowe ustawienia aplikacji',
        description: 'Inne ustawienia aplikacji, które możesz zmieniać'
    };

    res.render('index.ejs',
        {
            page,
            pageTitle: 'To jest tytuł strony',
            sections: data.page_titles,
            selectedPage: page.id,
            pages: data.pages,
            //user: false
            user: data.user,
            languages: data.languages,
            contentTypes: data.contentTypes
            //user: false
        });
})

app.use((req, res, next) => {
    res.status(404).render('error-custom-msg.ejs', {
        error: {
            title: 'Błąd 404',
            msg: 'Wybrana strona nie istnieje!',
        },
        title: null,
        info: null
    });
})

app.listen(4580);
