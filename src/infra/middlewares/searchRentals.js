import connection from "../../databases/postgres.js";

async function searchRentals(req, res, next) {
	const customerId = req.query.customerId;
	const gameId = req.query.gameId;
	const offset = req.query.offset;
	const limit = req.query.limit;
	const status = req.query.status;
	const startDate = req.query.startDate;

	//avoid sql injection on ORDER BY
	const columns = [
		"id",
		"customerId",
		"gameId",
		"rentDate",
		"daysRented",
		"returnDate",
		"originalPrice",
		"delayFee",
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

	try {
		if (customerId) {
			const { rows: data } = await connection.query(
				`SELECT rentals.*,
                (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
                (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
                FROM rentals 
                JOIN customers 
				ON rentals."customerId" = customers.id
                JOIN games 
				ON rentals."gameId" = games.id
                WHERE rentals."customerId" = $1 
				ORDER BY ${order} ${direction}
				LIMIT $2 OFFSET $3`,
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
                JOIN customers 
				ON rentals."customerId" = customers.id
                JOIN games 
				ON rentals."gameId" = games.id
                WHERE rentals."gameId" = $1 
				ORDER BY ${order} ${direction}
				LIMIT $2 OFFSET $3`,
				[gameId, limit, offset]
			);

			res.locals.data = data;

			next();
		}

		if (status) {
			let searchStatus;
			if (status === "open") {
				searchStatus = ` IS NULL `;
			} else {
				searchStatus = ` IS NOT NULL `;
			}

			const { rows: data } = await connection.query(
				`SELECT rentals.*,
                (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
                (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
                FROM rentals 
                JOIN customers 
				ON rentals."customerId" = customers.id
                JOIN games 
				ON rentals."gameId" = games.id
                WHERE rentals."returnDate" ${searchStatus}
				ORDER BY ${order} ${direction}
				LIMIT $1 OFFSET $2`,
				[limit, offset]
			);

			res.locals.data = data;

			next();
		}

		if (startDate) {
			const { rows: data } = await connection.query(
				`SELECT rentals.*,
                (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
                (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", 
				(SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
                FROM rentals 
                JOIN customers 
				ON rentals."customerId" = customers.id
                JOIN games 
				ON rentals."gameId" = games.id
                WHERE rentals."rentDate" >= '${startDate}'
				ORDER BY ${order} ${direction}
				LIMIT $1 OFFSET $2`,
				[limit, offset]
			);

			res.locals.data = data;

			next();
		}

		const { rows: data } = await connection.query(
			`SELECT rentals.*,
            (SELECT row_to_json(_) FROM (SELECT customers.id, customers.name) AS _) AS customer,
            (SELECT row_to_json(_) FROM (SELECT games.id, games.name, games."categoryId", (SELECT categories.name AS "categoryName" FROM categories WHERE games."categoryId"=categories.id)) AS _) AS game
            FROM rentals
            JOIN customers 
			ON rentals."customerId" = customers.id
            JOIN games 
			ON rentals."gameId" = games.id 
			ORDER BY ${order} ${direction}
			LIMIT $1 OFFSET $2
			`,
			[limit, offset]
		);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchRentals;
