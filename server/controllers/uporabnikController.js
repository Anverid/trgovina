const mysql = require('mysql');

exports.view = (req,res) => {
    res.render('home');
}