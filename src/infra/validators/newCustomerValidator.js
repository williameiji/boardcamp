import connection from "../../databases/postgres.js";

import schemaNewCustomer from "../schemas/schemaNewCustomer.js";

async function newCustomerValidator(req, res, next) {
	const data = req.body;
	console.log(data);
	const { error } = schemaNewCustomer.validate(data);

	if (error) return res.sendStatus(400);

	try {
		const { rows: isCustomerRegistred } = await connection.query(
			"SELECT cpf FROM customers WHERE cpf = $1",
			[data.cpf]
		);

		if (isCustomerRegistred.length) return res.sendStatus(409);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newCustomerValidator;
