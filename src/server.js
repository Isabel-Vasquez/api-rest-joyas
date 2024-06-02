const app = require('./app');

const port = 3000;

app.listen(port, () => {
	console.log(`Servidor ejecutándose en el puerto ${port}`);
});
