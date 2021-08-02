const express = require('express');
const router = express.Router();
const uporabnikController = require('../controllers/uporabnikController');


router.get('', (req, res) => {
    res.render('home');
});

//routes
router.get('/', uporabnikController.view);
//router.post('/', userController.find);


//router.get('/adduser', userController.form);
//router.post('/adduser', userController.create);
//router.get('/edituser/:id', userController.edit);
//router.post('/edituser/:id', userController.update);
//router.get('/viewuser/:id', userController.viewall);
//router.get('/deleteuser/:id',userController.delete);



module.exports = router;