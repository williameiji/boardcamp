export function sendGames(req, res, next) {
	try {
		const games = res.locals.games;

		res.status(200).send(games);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function addGames(req, res, next) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}
