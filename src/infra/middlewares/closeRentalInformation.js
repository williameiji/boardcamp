import connection from "../../databases/postgres.js";
import dayjs from "dayjs";

async function closeRentalInformation(req, res, next) {
	const { id } = req.params;

	const data = res.locals.data;

	let fee = null;

	try {
		const rentIn = dayjs(data[0].rentDate);

		const daysPassed = rentIn.diff(dayjs().format("YYYY-MM-DD"), "d") * -1;

		if (daysPassed > data[0].daysRented) {
			fee =
				(daysPassed - data[0].daysRented) *
				(data[0].originalPrice / data[0].daysRented);
		}

		await connection.query(
			`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE rentals.id = $3`,
			[dayjs().format("YYYY-MM-DD"), fee, id]
		);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default closeRentalInformation;
