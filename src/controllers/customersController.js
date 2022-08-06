import {
	searchCustomer,
	searchCustomerById,
	isCustomerRegistred,
	addNewCustomer,
	idFromCpf,
	updateCustomer,
} from "../repository/customerRepository.js";
import schemasValidator from "../infra/schemas/schemas.js";

export async function sendCostumers(req, res) {
	const cpf = req.query.cpf;
	const offset = req.query.offset;
	const limit = req.query.limit;

	try {
		const { rows: customers } = await searchCustomer(req, cpf, limit, offset);

		res.status(200).send(customers);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function sendCostumer(req, res) {
	const { id } = req.params;

	try {
		const { rows: customer } = await searchCustomerById(id);

		if (!customer.length) return res.sendStatus(404);

		res.status(200).send(customer);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function addCustomer(req, res) {
	const data = req.body;

	if (schemasValidator(req, data)) return res.sendStatus(400);

	try {
		const { rows: customer } = await isCustomerRegistred(data);

		if (customer.length) return res.sendStatus(409);

		await addNewCustomer(data);

		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function editCustomer(req, res) {
	const id = req.params.id;
	const data = req.body;

	if (schemasValidator(req, data)) return res.sendStatus(400);

	try {
		const { rows: customer } = await idFromCpf(data, id);

		if (!customer.length) return res.sendStatus(409);

		await updateCustomer(data, id);

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}
