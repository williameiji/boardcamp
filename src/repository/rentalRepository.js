import connection from "../databases/postgres.js";
import dayjs from "dayjs";

export async function searchRentals(
	req,
	customerId,
	gameId,
	offset,
	limit,
	status,
	startDate
) {
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

	if (customerId) {
		return await connection.query(
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
	}

	if (gameId) {
		return await connection.query(
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
	}

	if (status) {
		let searchStatus;
		if (status === "open") {
			searchStatus = ` IS NULL `;
		} else {
			searchStatus = ` IS NOT NULL `;
		}

		return await connection.query(
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
	}

	if (startDate) {
		return await connection.query(
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
	}

	return await connection.query(
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
}

export async function addNewRental(data, totalPrice) {
	return await connection.query(
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
}

export async function isRentalRegistred(id) {
	return await connection.query("SELECT * FROM rentals WHERE rentals.id = $1", [
		id,
	]);
}

export async function updateRental(rental, id) {
	let fee = null;

	const rentIn = dayjs(rental[0].rentDate);

	const daysPassed = rentIn.diff(dayjs().format("YYYY-MM-DD"), "d") * -1;

	if (daysPassed > rental[0].daysRented) {
		fee =
			(daysPassed - rental[0].daysRented) *
			(rental[0].originalPrice / rental[0].daysRented);
	}

	return await connection.query(
		`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE rentals.id = $3`,
		[dayjs().format("YYYY-MM-DD"), fee, id]
	);
}

export async function deleteRentalQuery(id) {
	return await connection.query(`DELETE FROM rentals WHERE rentals.id = $1`, [
		id,
	]);
}

export async function metricsRentals(startDate, endDate) {
	let queryWhere = null;

	function validateDate(element) {
		let regex = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/;
		return regex.test(element);
	}

	if (validateDate(startDate) && validateDate(endDate)) {
		queryWhere = `BETWEEN '${startDate}' AND '${endDate}'`;
	} else if (validateDate(startDate)) {
		queryWhere = `>= '${startDate}'`;
	} else if (validateDate(endDate)) {
		queryWhere = `<= '${startDate}'`;
	}

	if (queryWhere) {
		return await connection.query(`
            SELECT SUM(COALESCE("originalPrice", 0) + COALESCE("delayFee", 0)) as revenue, COUNT(id) as rentals, ROUND(AVG("originalPrice")) as average
            FROM rentals
            WHERE rentals."rentDate" ${queryWhere}
        `);
	}

	return await connection.query(`
            SELECT SUM(COALESCE("originalPrice", 0) + COALESCE("delayFee", 0)) as revenue, COUNT(id) as rentals, ROUND(AVG("originalPrice")) as average
            FROM rentals
        `);
}
