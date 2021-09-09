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


exports.add_to_cart = (req, res) => {
    console.log(req.body)
    if (!Array.isArray(req.session.kosarica)) {
        req.session.kosarica = []
    }
    const { izdelek_id, kosarica } = req.body;
    req.session.kosarica.push({ izdelek_id, kosarica });
    const prev_url = req.get('Referrer');
    res.redirect(prev_url);
}