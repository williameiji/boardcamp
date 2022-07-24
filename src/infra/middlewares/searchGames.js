import connection from "../../databases/postgres.js";

async function searchGames(req, res, next) {
	const name = req.query.name;
	const offset = req.query.offset;
	const limit = req.query.limit;

	//avoid sql injection on ORDER BY
	const columns = [
		"id",
		"name",
		"image",
		"stokeTotal",
		"categoryId",
		"pricePerDay",
	];
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

	if (!name) {
		try {
			const { rows: games } = await connection.query(
				`SELECT games.*, categories.name AS "categoryName", (SELECT COUNT(rentals."gameId") FROM rentals WHERE games.id = rentals."gameId") as "rentalsCount"
				FROM games 
				INNER JOIN categories 
				ON games."categoryId" = categories.id
				ORDER BY ${order} ${direction}
				LIMIT $1 OFFSET $2 
				`,
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
				`SELECT *, (SELECT COUNT(rentals."gameId") FROM rentals WHERE games.id = rentals."gameId") as "rentalsCount"
				FROM games 
				WHERE LOWER(name) 
				LIKE '%' || $1 || '%' 
				ORDER BY ${order} ${direction}
				LIMIT $2 OFFSET $3 `,
				[name, limit, offset]
			);

			res.locals.games = games;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	}
}

export default searchGames;
