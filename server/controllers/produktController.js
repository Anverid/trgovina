const mysql = require('mysql');
const produkt = require('../models/produkt')

exports.view = (req, res) => {
    res.render('vsi_produkti');
}



