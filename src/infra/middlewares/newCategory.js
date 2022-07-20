import connection from "../../databases/postgres.js";

async function newCategorie(req, res, next) {
	const data = res.locals.data;

	try {
		const isCategorieRegistered = await connection.query(
			"SELECT * FROM categories WHERE name = $1",
			[data.name]
		);

		if (isCategorieRegistered.rows.length) return res.sendStatus(409);

		await connection.query("INSERT INTO categories (name) VALUES ($1)", [
			data.name,
		]);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newCategorie;
