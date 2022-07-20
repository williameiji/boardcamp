export function sendGames(req, res) {
	try {
		const games = res.locals.games;

		res.status(200).send(games);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function addGames(req, res) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}
