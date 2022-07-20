import connection from "../../databases/postgres.js";

async function searchCustomer(req, res, next) {
	const cpf = req.query.cpf;

	if (!cpf) {
		try {
			const { rows: customers } = await connection.query(
				"SELECT * FROM customers"
			);

			res.locals.customers = customers;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	} else {
		//get with query
	}
}

export default searchCustomer;
