import connection from "../../databases/postgres.js";

import schemaNewGame from "../schemas/schemaNewGame.js";

async function newGameValidator(req, res, next) {
	const data = req.body;

	const { error } = schemaNewGame.validate(data);

	if (error) return res.sendStatus(400);

	try {
		const { rows: isCategoryId } = await connection.query(
			"SELECT id FROM categories WHERE id = $1",
			[data.categoryId]
		);

		if (!isCategoryId.length) return res.sendStatus(400);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newGameValidator;
