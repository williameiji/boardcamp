import {
	searchCategories,
	isCategoryRegistered,
	addNewCategory,
} from "../repository/categoryRepository.js";
import schemasValidator from "../infra/schemas/schemas.js";

export async function sendCategories(req, res) {
	const offset = req.query.offset;
	const limit = req.query.limit;

	try {
		const { rows: data } = await searchCategories(limit, offset, req);

		if (!data.length) return res.sendStatus(404);

		res.status(200).send(data);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function addCategory(req, res) {
	const data = req.body;

	if (schemasValidator(req, data)) return res.sendStatus(400);

	try {
		const { rows: category } = await isCategoryRegistered(data);

		if (category.length) return res.sendStatus(409);

		await addNewCategory(data);

		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}
