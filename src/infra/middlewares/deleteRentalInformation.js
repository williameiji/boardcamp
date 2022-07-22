import connection from "../../databases/postgres.js";

async function deleteRentalInformation(req, res, next) {
	const { id } = req.params;

	try {
		await connection.query(`DELETE FROM rentals WHERE rentals.id = $1`, [id]);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default deleteRentalInformation;
