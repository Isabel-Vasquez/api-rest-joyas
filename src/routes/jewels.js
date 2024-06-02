const express = require('express');
const router = express.Router();
const {
	getJewels,
	getJewelsByFilters,
} = require('../controllers/jewelsController');

router.get('/', getJewels);
router.get('/filtros', getJewelsByFilters);

module.exports = router;
