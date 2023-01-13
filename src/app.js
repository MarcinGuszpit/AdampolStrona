const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const data = require('./model/data');
//routes

const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
  secret:'To_jest_jakiś_sekretny_klucz_QWZx!23#',
  resave: false,
  saveUninitialized: false
}));


app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(mainRoutes);
app.use(adminRoutes);

app.get('/template_test', (req, res) => {
    console.log(data.user)
    res.render('index.ejs',
        {
            pageTitle: 'To jest tytuł strony',
            sections: data.page_titles,
            selectedPage: data.selectedPageId,
            pages: data.pageSections,
            //user: false
            user: data.user
        });
})

app.use((req, res, next) => {
    res.status(404).send('Eror 404');
})

app.listen(4580);
