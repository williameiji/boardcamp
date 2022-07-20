export function sendCostumers(res, res) {
	try {
		const customer = res.locals.customer;

		res.sendStatus(customer);
	} catch (error) {
		res.sendStatus(500);
	}
}
