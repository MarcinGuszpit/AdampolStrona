const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const {mongoDbConnect} = require('./utils/database');
const {appKey, databaseURL} = require("./settings/settings");
const MongoDBSessionStore = require('connect-mongodb-session')(session);


//routes
const mainPageRoutes = require('./routes/main');
const adminLoginRoutes = require('./routes/admin-login');
const adminRoutesAdditionalSettings = require('./routes/admin-settings');
const adminRoutesTexts = require('./routes/admin-texts');
const adminRoutesHTML = require('./routes/admin-html');
const adminRoutesPageSections = require('./routes/admin-page-sections');
const adminRoutesGalleries = require('./routes/admin-galleries');
const adminRoutesAdditional = require('./routes/admin-additional');


const app = express();
const csrfProtection = csrf();
// app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const store = MongoDBSessionStore({
    uri: databaseURL,
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
    // cookie: {
    //     maxAge: 1000 * 60 * 60, // 1 godz
    //     sameSite: 'none',
    //     secure: true,
    // },
    saveUninitialized: false,
    resave: false,
    secret: appKey,
    // resave: false,
    rolling: true,
    store: store
}));

app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use((req, res, next) => {
    console.log('log przy każdym żądaniu')
    console.log(req.session.loggedIn);
    next();
})

//routes
app.use(mainPageRoutes);
//admin routes
app.use(adminRoutesAdditionalSettings);
app.use(adminRoutesTexts);
app.use(adminRoutesHTML);
app.use(adminLoginRoutes);
app.use(adminRoutesPageSections);
app.use(adminRoutesGalleries);
app.use(adminRoutesAdditional);

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

mongoDbConnect(() => {
    app.listen(4580);
});


