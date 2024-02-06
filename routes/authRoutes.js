const express = require('express');
const {
    authRegister,
    getAuth,
    authLogin
} = require('../controller/authController');
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyUser = require('../middleware/verifyUser');
const router = express.Router();

router.post('/register', authRegister);
router.post('/login', authLogin);
router.get('/admin', verifyAdmin, getAuth);
router.get('/', verifyUser, getAuth);

module.exports = router;