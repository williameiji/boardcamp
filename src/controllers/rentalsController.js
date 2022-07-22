export function addRental(req, res) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function sendRentals(req, res) {
	try {
		const data = res.locals.data;

		res.status(200).send(data);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function closeRental(req, res) {
	try {
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function deleteRental(req, res) {
	try {
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}
