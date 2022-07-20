export function sendGames(req, res, next) {
	try {
		const games = res.locals.games;

		res.status(200).send(games);
	} catch (error) {
		res.sendStatus(500);
	}
}
