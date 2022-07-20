import connection from "../../databases/postgres.js";

async function searchCustomer(req, res, next) {
	const cpf = req.query.cpf;

	if (!cpf) {
		try {
			const { rows: customer } = await connection.query(
				"SELECT * FROM costumers"
			);

			res.locals.customer = customer;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	} else {
		//search with query
	}
}

export default searchCustomer;
