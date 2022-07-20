export function sendCategories(req, res) {
	try {
		const data = res.locals.data;

		res.status(200).send(data);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function addCategory(req, res) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}
