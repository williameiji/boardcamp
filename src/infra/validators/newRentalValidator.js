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
			`SELECT COUNT(rentals."gameId") FROM rentals WHERE rentals."gameId" = ${data.gameId} AND rentals."returnDate" IS NULL`
		);

		if (!isGameRegistred.length) return res.sendStatus(400);
		if (!isCustomerRegistred.length) return res.sendStatus(400);
		if (parseInt(isGameAvailable[0].count) === isGameRegistred[0].stockTotal)
			return res.sendStatus(400);
		if (data.daysRented < 1) return res.sendStatus(400);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newRentalValidator;
