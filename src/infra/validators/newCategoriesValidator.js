import schemaNewCategory from "../schemas/schemaNewCategory.js";

function newCategoriesValidator(req, res, next) {
	try {
		const data = req.body;

		const { error } = schemaNewCategory.validate(data);

		if (error) return res.sendStatus(400);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newCategoriesValidator;
