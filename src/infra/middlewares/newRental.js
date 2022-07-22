import connection from "../../databases/postgres.js";
import dayjs from "dayjs";

async function newRental(req, res, next) {
	const data = req.body;

	try {
		const { rows: price } = await connection.query(
			`SELECT games."pricePerDay" FROM games WHERE id = $1`,
			[data.gameId]
		);

		const totalPrice = price[0].pricePerDay * data.daysRented;

		console.log(totalPrice);

		await connection.query(
			`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			[
				data.customerId,
				data.gameId,
				dayjs().format(`YYYY-MM-DD`),
				data.daysRented,
				null,
				totalPrice,
				null,
			]
		);

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newRental;
