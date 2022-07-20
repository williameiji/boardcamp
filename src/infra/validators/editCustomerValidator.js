import connection from "../../databases/postgres.js";

import schemaNewCustomer from "../schemas/schemaNewCustomer.js";

async function editCustomerValidator(req, res, next) {
	const id = req.params.id;
	const data = req.body;

	const { error } = schemaNewCustomer.validate(data);

	if (error) return res.sendStatus(400);

	try {
		const { rows: isCustomerRegistred } = await connection.query(
			"SELECT id FROM customers WHERE id = $1",
			[id]
		);

		if (!isCustomerRegistred.length) return res.sendStatus(404);

		res.locals.data = data;
		res.locals.id = id;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default editCustomerValidator;
