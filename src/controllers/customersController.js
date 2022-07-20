export function sendCostumers(req, res) {
	try {
		const customers = res.locals.customers;

		res.status(200).send(customers);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function sendCostumer(req, res) {
	try {
		const customer = res.locals.customer;

		res.status(200).send(customer);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function addCustomer(req, res) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function editCustomer(req, res) {
	try {
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}
