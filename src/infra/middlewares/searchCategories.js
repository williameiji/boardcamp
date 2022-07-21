import connection from "../../databases/postgres.js";

async function searchCategories(req, res, next) {
	const offset = req.query.offset;
	const limit = req.query.limit;

	try {
		const { rows: data } = await connection.query(
			"SELECT * FROM categories LIMIT $1 OFFSET $2",
			[limit, offset]
		);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(404);
	}
}

export default searchCategories;
