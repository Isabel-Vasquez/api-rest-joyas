const errorHandler = (err, req, res, next) => {
	console.error(err.message);
	res.status(500).json({ error: 'Error en el servidor' });
};

module.exports = errorHandler;
