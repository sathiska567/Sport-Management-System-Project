// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, authenticateToken, nextFunc } = require('../controllers/adminController');

router.post('/register', register);

router.post('/login', login);

router.get('/dashboard', authenticateToken, nextFunc);






module.exports = router;
