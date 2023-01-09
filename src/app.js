const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const data = require('./model/data');
//routes
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(mainRoutes);
app.use(adminRoutes);

app.use((req, res, next) => {
    res.status(404).send('Eror 404');
})


// app.get('/template_test', (req, res) => {
//     res.render('main.ejs', {docTitle: data.document_title, data_array: data.page_titles});
// })

app.listen(4580);
