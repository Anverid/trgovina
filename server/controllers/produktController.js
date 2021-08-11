const mysql = require('mysql');
const produkt = require('../models/produkt')



exports.view = (req, res) => {
    res.render('/vsi_produkti');
}



exports.view = (req, res) => {
    // User the connection
    produkt.get((err, rows) => {
        if (!err) {
            res.render('vsi_produkti', { rows });
        } else {
            console.log(err);
        }
    });
}