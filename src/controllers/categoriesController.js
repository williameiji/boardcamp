export function sendCategories(req, res, next) {
	try {
		const data = res.locals.data;

		res.status(200).send(data);
	} catch (error) {
		res.sendStatus(500);
	}
}
