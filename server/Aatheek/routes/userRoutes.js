// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, authenticateToken, userDashboard } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authenticateToken, userDashboard);





module.exports = router;
