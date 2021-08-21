const mysql = require('mysql');
const produkt = require('../models/produkt')
const kategorija = require('../models/kategorija');





exports.view = (req, res) => {
    console.log(req.query.kategorija)
    produkt.get((err, rows) => {
        if (!err) {
            let ime_kategorija = 'Vsi izdelki';
            let izdelki = rows;
            if (req.query.kategorija) {
                izdelki = rows.filter(row => req.query.kategorija == row.id_produkt_kat)
                kategorija.find(req.query.kategorija, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    let row = rows[0];
                    ime_kategorija = row.ime_kategorija;
                    res.render('vsi_izdelki', { ime_kategorija, rows: izdelki });
                });
                return;
            }
            res.render('vsi_izdelki', { ime_kategorija, rows: izdelki });
        } else {
            console.log(err);
        }
    });
}