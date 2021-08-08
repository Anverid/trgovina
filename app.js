const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { check, validationResult } = require('express-validator')
const { authUser, authRole } = require('./basicAuth')


require('dotenv').config();

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


// Navigation

app.get('', (req, res) => {
    res.render('home')
});


app.get('/validation', (req, res) => {
    res.render('validation')
});

//app.post('/validation', urlencodedParser, [
//    check('InputEmail', 'Email is not valid')
//        .isEmail()
//       .normalizeEmail()
//       .exists()
//], (req, res) => {

//    const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//       return res.status(422).jsonp(errors.array())
//   }
//});




app.get('/prijava', (req, res) => {
    res.render('prijava')
});


app.get('/admin_upo', authUser, authRole(admin.true), (req, res) => {
    res.send('Dobrodošel Admin')
})




const routes = require('./server/routes/uporabnik');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));