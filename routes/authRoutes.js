const express = require('express');
const router = express.Router();
const { signup, login, profile } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
