import connection from "../../databases/postgres.js";

async function searchRentals(req, res, next) {
	const customerId = req.query.customerId;
	const gameId = req.query.gameId;
	const offset = req.query.offset;
	const limit = req.query.limit;

	try {
		if (customerId) {
			const { rows: data } = await connection.query(
				`SELECT rentals.*,
                (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
                (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
                FROM rentals 
                join customers ON rentals."customerId" = customers.id
                join games ON rentals."gameId" = games.id
                WHERE rentals."customerId" = $1 LIMIT $2 OFFSET $3`,
				[customerId, limit, offset]
			);

			res.locals.data = data;

			next();
		}
		if (gameId) {
			const { rows: data } = await connection.query(
				`SELECT rentals.*,
                (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
                (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
                FROM rentals 
                join customers ON rentals."customerId" = customers.id
                join games ON rentals."gameId" = games.id
                WHERE rentals."gameId" = $1 LIMIT $2 OFFSET $3`,
				[gameId, limit, offset]
			);

			res.locals.data = data;

			next();
		}
		const { rows: data } = await connection.query(
			`SELECT rentals.*,
            (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
            (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
            FROM rentals
            join customers ON rentals."customerId" = customers.id
            join games ON rentals."gameId" = games.id 
			LIMIT $1 OFFSET $2`,
			[limit, offset]
		);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchRentals;
