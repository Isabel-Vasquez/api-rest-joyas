const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres', // Reemplazar con tu usuario de PostgreSQL
	host: 'localhost',
	database: 'joyas',
	password: 'azucat', // Reemplazar con tu contraseña de PostgreSQL
	port: 5432,
	allowExitOnIdle: true,
});

pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

module.exports = pool;
