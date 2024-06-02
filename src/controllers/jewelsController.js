const pool = require('../db/db');
const format = require('pg-format');

const getJewels = async (req, res, next) => {
	try {
		const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
		const [campo, direccion] = order_by.split('_');
		const offset = (page - 1) * limits;
		const formattedQuery = format(
			'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
			campo,
			direccion,
			limits,
			offset,
		);
		const { rows } = await pool.query(formattedQuery);
		const total = rows.length;
		const HATEOAS = {
			total,
			results: rows.map((j) => ({
				name: j.nombre,
				href: `/joyas/${j.id}`,
			})),
		};
		res.json(HATEOAS);
	} catch (err) {
		next(err);
	}
};

const getJewelsByFilters = async (req, res, next) => {
	try {
		const { precio_max, precio_min, categoria, metal } = req.query;
		let filtros = [];
		const values = [];

		if (precio_max) {
			filtros.push('precio <= $' + (values.length + 1));
			values.push(precio_max);
		}
		if (precio_min) {
			filtros.push('precio >= $' + (values.length + 1));
			values.push(precio_min);
		}
		if (categoria) {
			filtros.push('categoria = $' + (values.length + 1));
			values.push(categoria);
		}
		if (metal) {
			filtros.push('metal = $' + (values.length + 1));
			values.push(metal);
		}

		let consulta = 'SELECT * FROM inventario';
		if (filtros.length > 0) {
			consulta += ' WHERE ' + filtros.join(' AND ');
		}

		const { rows } = await pool.query(consulta, values);
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getJewels,
	getJewelsByFilters,
};
