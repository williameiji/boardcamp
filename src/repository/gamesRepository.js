import connection from "../databases/postgres.js";

export async function searchGames(req, name, limit, offset) {
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

	if (!name) {
		return await connection.query(
			`SELECT games.*, categories.name AS "categoryName", (SELECT COUNT(rentals."gameId") FROM rentals WHERE games.id = rentals."gameId") as "rentalsCount"
				FROM games 
				INNER JOIN categories 
				ON games."categoryId" = categories.id
				ORDER BY ${order} ${direction}
				LIMIT $1 OFFSET $2 
				`,
			[limit, offset]
		);
	} else {
		return await connection.query(
			`SELECT *, (SELECT COUNT(rentals."gameId") FROM rentals WHERE games.id = rentals."gameId") as "rentalsCount"
				FROM games 
				WHERE LOWER(name) 
				LIKE '%' || $1 || '%' 
				ORDER BY ${order} ${direction}
				LIMIT $2 OFFSET $3 `,
			[name, limit, offset]
		);
	}
}

export async function isGameRegistred(data) {
	return await connection.query(
		"SELECT * FROM games WHERE LOWER(games.name) = $1",
		[data.name.toLowerCase()]
	);
}

export async function addNewGame(data) {
	return await connection.query(
		`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
		[data.name, data.image, data.stockTotal, data.categoryId, data.pricePerDay]
	);
}

export async function isGameRegistredById(id) {
	return await connection.query("SELECT * FROM games WHERE games.id = $1", [
		id,
	]);
}

export async function isGameAvailable(id) {
	return await connection.query(
		`SELECT COUNT(rentals."gameId") FROM rentals WHERE rentals."gameId" = ${id} AND rentals."returnDate" IS NULL`
	);
}

export async function getPrice(id) {
	return await connection.query(
		`SELECT games."pricePerDay" FROM games WHERE id = $1`,
		[id]
	);
}
