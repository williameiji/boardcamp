import connection from "../../databases/postgres.js";

async function searchCategories(req, res, next) {
	const offset = req.query.offset;
	const limit = req.query.limit;

	//avoid sql injection on ORDER BY
	const columns = ["id", "name"];
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
		const { rows: data } = await connection.query(
			`SELECT * 
			FROM categories 
			ORDER BY ${order} ${direction}
			LIMIT $1 OFFSET $2`,
			[limit, offset]
		);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(404);
	}
}

export default searchCategories;
