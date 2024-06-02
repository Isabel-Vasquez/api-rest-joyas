const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(logger);
app.use('/joyas', routes.jewels); // Asegúrate de que esta línea está configurada correctamente

app.use((req, res) => {
	res.status(404).send('Esta ruta no existe');
});

app.use(errorHandler);

module.exports = app;
