require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { check, validationResult } = require('express-validator')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const kategorijaController = require('./server/controllers/kategorijaController');
const connection = require('./server/connection').connection;

const sessionStore = new MySQLStore({}, connection);

const app = express();
const port = process.env.PORT || 4000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Session - authentication
app.use(session({ secret: process.env.SESSION_SECRET, store: sessionStore }))

//Add logged in user to locals
app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.user = req.session.user;
    res.locals.kosarica = req.session.kosarica ?? [];
    next();
});

// Navigation 

app.get('', kategorijaController.view);

app.get('/home', (req, res) => {
    res.render('home')
});
app.get('/validation', (req, res) => {
    res.render('validation')
});
app.get('/prijava', (req, res) => {
    res.render('prijava')
});
app.get('/odjava', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
})
app.get('/dostava', (req, res) => {
    res.render('dostava')
});
app.get('/o_nas', (req, res) => {
    res.render('o_nas')
});
app.get('/narocilo', (req, res) => {
    res.render('narocilo')
});







const routerUporabnik = require('./server/routes/uporabnik');
app.use('/', routerUporabnik);
const routerProdukt = require('./server/routes/produkt');
const { post } = require('./server/routes/uporabnik');
app.use('/', routerProdukt);
app.use('/admin/', require('./server/routes/admin'))



app.listen(port, () => console.log(`Listening on port ${port}`));