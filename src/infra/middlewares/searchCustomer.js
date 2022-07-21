import connection from "../../databases/postgres.js";

async function searchCustomer(req, res, next) {
	const cpf = req.query.cpf;
	const offset = req.query.offset;
	const limit = req.query.limit;

	if (!cpf) {
		try {
			const { rows: customers } = await connection.query(
				"SELECT * FROM customers LIMIT $1 OFFSET $2",
				[limit, offset]
			);

			res.locals.customers = customers;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	} else {
		const { rows: customers } = await connection.query(
			"SELECT * FROM  customers WHERE cpf LIKE '%' || $1 || '%' LIMIT $2 OFFSET $3 ",
			[cpf, limit, offset]
		);

		res.locals.customers = customers;

		next();
	}
}

export default searchCustomer;
