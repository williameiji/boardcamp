export function sendCostumers(req, res) {
	try {
		const customer = res.locals.customer;

		res.status(200).send(customer);
	} catch (error) {
		res.sendStatus(500);
	}
}
