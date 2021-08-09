const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { check, validationResult } = require('express-validator')
//const { authUser, authRole } = require('./basicAuth')


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

app.get('/admin_upo', (req, res) => {
    res.render('admin_upo')
});
/*app.get('/admin_upo', authUser, authRole(admin.true), (req, res) => {
    res.send('Dobrodošel Admin')
})
*/

app.get('/dostava', (req, res) => {
    res.render('dostava')
});

app.get('/o_nas', (req, res) => {
    res.render('o_nas')
});




app.get('/vsi_izdelki', (req, res) => {
    res.render('vsi_izdelki')
});
app.get('/zelenjava', (req, res) => {
    res.render('zelenjava')
});
app.get('/sadje', (req, res) => {
    res.render('sadje')
});
app.get('/zabojcki', (req, res) => {
    res.render('zabojcki')
});
app.get('/zacimbe', (req, res) => {
    res.render('zacimbe')
});
app.get('/pijace', (req, res) => {
    res.render('pijace')
});
app.get('/drugo', (req, res) => {
    res.render('drugo')
});


const routes = require('./server/routes/uporabnik');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));