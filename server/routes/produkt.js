const express = require('express');
const router = express.Router();
const produktController = require('../controllers/produktController');






router.get('/vsi_izdelki', produktController.view);













module.exports = router;