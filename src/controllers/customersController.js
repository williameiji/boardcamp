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
