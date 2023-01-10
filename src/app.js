const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const data = require('./model/data');
//routes
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
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
            pages: data.pages,
            //user: false
            user: data.user
        });
})

app.use((req, res, next) => {
    res.status(404).send('Eror 404');
})

app.listen(4580);
