import connection from "../../databases/postgres.js";

async function closeRentalValidator(req, res, next) {
	const { id } = req.params;

	try {
		const { rows: isRentalRegistred } = await connection.query(
			"SELECT * FROM rentals WHERE rentals.id = $1",
			[id]
		);
		if (!isRentalRegistred.length) return res.sendStatus(404);

		if (isRentalRegistred[0].returnDate !== null) return res.sendStatus(400);

		res.locals.data = isRentalRegistred;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default closeRentalValidator;
