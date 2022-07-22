import connection from "../../databases/postgres.js";

async function newRentalValidator(req, res, next) {
	const data = req.body;

	try {
		const { rows: isCustomerRegistred } = await connection.query(
			"SELECT * FROM customers WHERE id = $1",
			[data.customerId]
		);

		const { rows: isGameRegistred } = await connection.query(
			"SELECT * FROM games WHERE id = $1",
			[data.gameId]
		);

		const { rows: isGameAvailable } = await connection.query(
			`SELECT * FROM games WHERE games."stockTotal" < (SELECT COUNT(rentals."gameId") FROM rentals WHERE rentals."gameId" = $1)`,
			[data.gameId]
		);

		if (
			!isCustomerRegistred.length ||
			!isGameRegistred.length ||
			!isGameAvailable ||
			data.daysRented < 1
		)
			return res.sendStatus(400);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newRentalValidator;
