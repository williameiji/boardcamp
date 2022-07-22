import connection from "../../databases/postgres.js";

import schemaNewGame from "../schemas/schemaNewGame.js";

async function newGameValidator(req, res, next) {
	const data = req.body;

	const { error } = schemaNewGame.validate(data);

	if (error) return res.sendStatus(400);

	try {
		const { rows: isCategoryRegistred } = await connection.query(
			`SELECT * FROM categories WHERE categories.id = $1`,
			[data.categoryId]
		);

		if (!isCategoryRegistred.length) return res.sendStatus(400);

		const { rows: isGameRegistred } = await connection.query(
			"SELECT * FROM games WHERE games.name = $1",
			[data.name]
		);

		if (isGameRegistred.length) return res.sendStatus(409);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newGameValidator;
