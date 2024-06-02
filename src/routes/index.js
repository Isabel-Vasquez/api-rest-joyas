const express = require('express');
const jewels = require('./jewels');

const router = express.Router();

router.use('/', jewels); // Asegúrate de que esta línea está configurada correctamente

module.exports = {
	jewels: router,
};
