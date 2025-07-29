const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const controller = require('../controllers/bookController');

router.get('/', auth, controller.getBooks);
router.post('/', auth, role('admin'), controller.addBook);
router.delete('/:id', auth, role('admin'), controller.deleteBook);

module.exports = router;
