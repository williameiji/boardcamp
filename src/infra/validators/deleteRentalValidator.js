import connection from "../../databases/postgres.js";

async function deleteRentalValidator(req, res, next) {
	const { id } = req.params;

	try {
		const { rows: isRentalRegistred } = await connection.query(
			`SELECT * FROM rentals WHERE rentals.id = $1`,
			[id]
		);
		console.log(isRentalRegistred);
		if (!isRentalRegistred.length) return res.sendStatus(404);

		if (isRentalRegistred[0].returnDate === null) return res.sendStatus(400);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default deleteRentalValidator;
