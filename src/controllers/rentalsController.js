export function addRental(req, res) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function sendRentals(req, res) {
	try {
		res.sendStatus(200);
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
