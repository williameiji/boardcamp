import connection from "../../databases/postgres.js";

async function searchCustomerById(req, res, next) {
	const { id } = req.params;
	try {
		const { rows: customer } = await connection.query(
			"SELECT * FROM customers WHERE id = $1",
			[id]
		);

		if (!customer.length) return res.sendStatus(404);

		res.locals.customer = customer;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchCustomerById;
