// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const validinfo = require("../../config/validInfo");

// router.post('/register',validinfo, userController.register);
// router.post('/login', userController.login);


// module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../../config/authenticateToken');
const validinfo = require("../../config/validInfo");

router.post('/register', validinfo, userController.register);
router.post('/login', userController.login);


module.exports = router;


