import connection from "../../databases/postgres.js";

async function searchGames(req, res, next) {
	const name = req.query.name;

	if (!name) {
		try {
			const { rows: games } = await connection.query("SELECT * FROM games");

			res.locals.games = games;

			next();
		} catch (error) {
			res.sendStatus(500);
		}
	} else {
		//search with query
	}
}

export default searchGames;
