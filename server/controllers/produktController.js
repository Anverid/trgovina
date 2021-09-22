const mysql = require('mysql');
const produkt = require('../models/produkt')
const kategorija = require('../models/kategorija');
const narocilo = require('./../models/narocilo')




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
    const { izdelek_id, kolicina } = req.body;
    req.session.kosarica.push({ izdelek_id, kolicina });
    const prev_url = req.get('Referrer');
    res.redirect(prev_url);
}

exports.remove_from_cart = (req, res) => {
    console.log(req.body);
    console.log(req.session.kosarica);
    const { izdelek_id, kolicina } = req.body;

    // Najdi izdelek-količino v košarici
    // const index = req.session.kosarica.indexOf({ izdelek_id, kolicina });
    let index = -1;
    for (let i = 0; i < req.session.kosarica.length; i++) {
        const element = req.session.kosarica[i];
        if (element.izdelek_id == izdelek_id && element.kolicina == kolicina) {
            index = i;
            break;
        }
    }
    console.log('Najden index', index);
    // Odstrani izdelek-količino če je bila najdena
    if (index > -1) {
        req.session.kosarica.splice(index, 1);
    }

    const prev_url = req.get('Referrer');
    res.redirect(prev_url);
}

exports.show_cart = (req, res) => {
    produkt.get((err, rows) => {
        if (!err) {
            let izdelki = rows;
            const kosarica = req.session.kosarica;
            let izdelki_v_kosarici = [];
            let cena = 0;
            for (const izdelek of izdelki) {
                for (const izdelek_kosarica of kosarica) {
                    if (izdelek.id == izdelek_kosarica.izdelek_id) {
                        const kopija = { ...izdelek, kolicina: izdelek_kosarica.kolicina };
                        izdelki_v_kosarici.push(kopija);
                        cena += izdelek.cena_na_100g_prod * izdelek_kosarica.kolicina;
                    }
                }
            }
            console.log(izdelki_v_kosarici);

            res.render('kosarica', { rows: izdelki_v_kosarici, cena });
        } else {
            console.log(err);
        }
    });
}

exports.make_order = (req, res) => {
    console.log(req.session.kosarica);

    const kosarica = req.session.kosarica;
    const user = res.locals.user;

    if (!kosarica || kosarica.length == 0) {
        const prev_url = req.get('Referrer');
        res.redirect(prev_url);
        return;
    }

    if (!user || !res.locals.loggedIn) {
        res.render('prijava', { alert: 'Za naročanje morate biti prijavljeni v vaš račun.' });
        return;
    }

    // Uporabnik je prijavljen in ima vsaj en izdelek v košarici

    // Izračunaj ceno naročila
    produkt.get((err, rows) => {
        if (!err) {
            let izdelki = rows;
            let cena = 0;
            for (const izdelek of izdelki) {
                for (const izdelek_kosarica of kosarica) {
                    if (izdelek.id == izdelek_kosarica.izdelek_id) {
                        cena += izdelek.cena_na_100g_prod * izdelek_kosarica.kolicina;
                    }
                }
            }
            console.log(cena);

            // Naredi naročilo v bazi
            narocilo.create({ id_narocnik: user.id, cena, kosarica }, (err, rows) => {
                if (!err) {
                    // Yay, naročilo narejeno v bazi!
                    req.session.kosarica = [];
                    res.redirect('/pregled_nar_upo');
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });




}