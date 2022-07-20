import connection from "../../databases/postgres.js";

async function searchCategories(req, res, next) {
	try {
		const data = await connection.query("SELECT * FROM categories");

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(404);
	}
}

export default searchCategories;
