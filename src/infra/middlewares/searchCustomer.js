import connection from "../../databases/postgres.js";

async function searchCustomer(req, res, next) {
	const cpf = req.query.cpf;
	const offset = req.query.offset;
	const limit = req.query.limit;

	//avoid sql injection on ORDER BY
	const columns = ["id", "name", "phone", "cpf", "birthday"];
	let order;
	let direction = "ASC";

	if (columns.some((item) => item === req.query.order)) {
		order = `"${req.query.order}"`;
	} else {
		order = "id";
	}

	if (req.query.desc) {
		direction = "DESC";
	}
	//avoid sql injection on ORDER BY

	if (!cpf) {
		try {
			const { rows: customers } = await connection.query(
				`SELECT *, (SELECT COUNT(rentals."customerId") FROM rentals WHERE customers.id = rentals."customerId") as "rentalsCount"
				FROM customers 
				ORDER BY ${order} ${direction}
				LIMIT $1 OFFSET $2`,
				[limit, offset]
			);

			res.locals.customers = customers;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	} else {
		const { rows: customers } = await connection.query(
			`SELECT *, (SELECT COUNT(rentals."customerId") FROM rentals WHERE customers.id = rentals."customerId") as "rentalsCount"
			FROM  customers 
			WHERE cpf 
			LIKE '%' || $1 || '%' 
			ORDER BY ${order} ${direction}
			LIMIT $2 OFFSET $3`,
			[cpf, limit, offset]
		);

		res.locals.customers = customers;

		next();
	}
}

export default searchCustomer;
