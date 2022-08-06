import {
	searchGames,
	isGameRegistred,
	addNewGame,
} from "../repository/gamesRepository.js";
import schemasValidator from "../infra/schemas/schemas.js";
import { isCategoryRegisteredById } from "../repository/categoryRepository.js";

export async function sendGames(req, res) {
	const name = req.query.name;
	const offset = req.query.offset;
	const limit = req.query.limit;

	try {
		const { rows: games } = await searchGames(req, name, limit, offset);

		res.status(200).send(games);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function addGames(req, res) {
	const data = req.body;

	if (schemasValidator(req, data)) return res.sendStatus(400);

	try {
		const { rows: category } = await isCategoryRegisteredById(data.categoryId);

		if (!category.length) return res.sendStatus(400);

		const { rows: game } = await isGameRegistred(data);

		if (game.length) return res.sendStatus(409);

		await addNewGame(data);

		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}
