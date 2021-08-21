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
router.get('/admin_upo', uporabnikController.view);

router.get('/registriraj_uporabnika', uporabnikController.form);
router.post('/registriraj_uporabnika', urlencodedParser, [
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()
        .exists(),
    check('ime', 'Ime neprimerno')
        .exists()
        .isLength({ min: 3 })
], uporabnikController.create);
//router.get('/edituser/:id', userController.edit);
//router.post('/edituser/:id', userController.update);
//router.get('/viewuser/:id', userController.viewall);
//router.get('/deleteuser/:id',userController.delete);



module.exports = router;