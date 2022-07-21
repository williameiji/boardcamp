import connection from "../../databases/postgres.js";

async function searchGames(req, res, next) {
	const name = req.query.name;
	const offset = req.query.offset;
	const limit = req.query.limit;

	if (!name) {
		try {
			const { rows: games } = await connection.query(
				`SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS categoryName FROM games INNER JOIN categories ON games."categoryId" = categories.id LIMIT $1 OFFSET $2`,
				[limit, offset]
			);

			res.locals.games = games;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	} else {
		try {
			const { rows: games } = await connection.query(
				"SELECT * FROM games WHERE LOWER(name) LIKE '%' || $1 || '%' LIMIT $2 OFFSET $3 ORDER BY $4 $5",
				[name, limit, offset, order, direction]
			);

			res.locals.games = games;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	}
}

export default searchGames;
