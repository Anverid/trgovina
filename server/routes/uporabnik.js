const express = require('express');
const router = express.Router();
const uporabnikController = require('../controllers/uporabnikController');
const { check } = require('express-validator')
const urlencodedParser = express.urlencoded({ extended: false })


router.get('', (req, res) => {
    res.render('home');
});

router.get('', (req, res) => {
    res.render('admin_upo');
});

//routes
router.get('/', uporabnikController.view);
//router.post('/', userController.find);

router.get('/registriraj_uporabnika', uporabnikController.form);
router.post('/registriraj_uporabnika', urlencodedParser, [

    check('ime', 'Ime neprimerno')
        .isLength({ min: 3 })
        .trim(),
    check('priimek', 'Priimek neprimeren')
        .isLength({ min: 3 })
        .trim(),
    check('email', 'Email ni primeren')
        .isEmail()
        // .normalizeEmail()
        .exists()
        .trim(),
    check('geslo', 'Geslo ni primerno')
        .isLength({ min: 6 }),
    check('gesloHash', 'Geslo se ne ujema')
        .custom((value, { req }) => {
            if (value !== req.body.geslo) {
                throw new Error("Geslo se ne ujema");
            } else {
                return value;
            }
        })
        .exists(),
    check('naslov', 'Naslov neprimeren')
        .isLength({ min: 3 })
        .trim(),
    check('pošta', 'Pošta ni primerna')
        .exists()
        .trim(),
    check('poštna_številka', 'Poštna številka ni primerna')
        .isPostalCode('SI')
        //       .isIn(str, values)
        .trim(),
    check('ime_država', 'Ime Države ni pravo, Vpiši Slovenija')




], uporabnikController.create);



router.post('/prijavi_uporabnika', uporabnikController.login);

router.get('/pregled_nar_upo', uporabnikController.view_orders);



module.exports = router;