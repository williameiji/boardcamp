import connection from "../../databases/postgres.js";

async function searchRentals(req, res, next) {
	const customerId = req.query.customerId;
	const gameId = req.query.gameId;

	try {
		if (customerId) {
			await connection.query(
				`SELECT rentals.*,
                (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
                (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
                FROM rentals 
                join customers ON rentals."customerId" = customers.id
                join games ON rentals."gameId" = games.id
                WHERE rentals."customerId" = $1`,
				[customerId]
			);
			next();
		}
		if (gameId) {
			await connection.query(
				`SELECT rentals.*,
                (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
                (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
                FROM rentals 
                join customers ON rentals."customerId" = customers.id
                join games ON rentals."gameId" = games.id
                WHERE rentals."gameId" = $1`,
				[gameId]
			);
			next();
		}
		await connection.query(
			`SELECT rentals.*,
            (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
            (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
            FROM rentals
            join customers ON rentals."customerId" = customers.id
            join games ON rentals."gameId" = games.id`
		);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchRentals;
