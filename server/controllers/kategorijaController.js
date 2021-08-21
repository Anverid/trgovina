const mysql = require('mysql');
const kategorija = require('../models/kategorija');


exports.view = (req, res) => {

    kategorija.get((err, rows) => {
        if (!err) {
            res.render('home', { rows });
        } else {
            console.log(err);
        }
    });
}