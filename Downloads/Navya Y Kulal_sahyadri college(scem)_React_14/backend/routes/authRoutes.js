const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
router.get('/users', auth, role('admin'), listUsers);
router.put('/users/:id/role', auth, role('admin'), updateRole);
