const express = require('express');
const router = express.Router();
const uporabnikController = require('../controllers/uporabnikController');


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
router.post('/registriraj_uporabnika', uporabnikController.create);
//router.get('/edituser/:id', userController.edit);
//router.post('/edituser/:id', userController.update);
//router.get('/viewuser/:id', userController.viewall);
//router.get('/deleteuser/:id',userController.delete);



module.exports = router;