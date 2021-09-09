const express = require('express');
const router = express.Router();
const produktController = require('../controllers/produktController');






router.get('/vsi_izdelki', produktController.view);






router.post('/dodaj_v_kosarico', produktController.add_to_cart);






module.exports = router;