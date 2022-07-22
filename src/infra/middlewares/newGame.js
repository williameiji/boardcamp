import connection from "../../databases/postgres.js";

async function newGame(req, res, next) {
	const data = res.locals.data;

	try {
		const isGameRegistered = await connection.query(
			"SELECT * FROM games WHERE name = $1",
			[data.name]
		);

		if (isGameRegistered.rows.length) return res.sendStatus(409);

		await connection.query(
			`INSERT INTO games ("name","image","stockTotal","categoryId","pricePerDay", ) VALUES ($1, $2, $3, $4, $5)`,
			[
				data.name,
				data.image,
				data.stockTotal,
				data.categoryId,
				data.pricePerDay,
			]
		);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newGame;
