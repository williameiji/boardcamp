import {
	searchRentals,
	addNewRental,
	isRentalRegistred,
	updateRental,
	deleteRentalQuery,
	metricsRentals,
} from "../repository/rentalRepository.js";
import { searchCustomerById } from "../repository/customerRepository.js";
import {
	isGameRegistredById,
	isGameAvailable,
	getPrice,
} from "../repository/gamesRepository.js";

export async function addRental(req, res) {
	const data = req.body;

	try {
		const { rows: customer } = await searchCustomerById(data.customerId);

		if (!customer.length) return res.sendStatus(400);

		const { rows: game } = await isGameRegistredById(data.gameId);

		if (!game.length) return res.sendStatus(400);

		const { rows: gameAvailable } = await isGameAvailable(data.gameId);

		if (parseInt(gameAvailable[0].count) === game[0].stockTotal)
			return res.sendStatus(400);

		if (data.daysRented < 1) return res.sendStatus(400);

		const { rows: price } = await getPrice(data.gameId);

		const totalPrice = price[0].pricePerDay * data.daysRented;

		await addNewRental(data, totalPrice);

		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function sendRentals(req, res) {
	const customerId = req.query.customerId;
	const gameId = req.query.gameId;
	const offset = req.query.offset;
	const limit = req.query.limit;
	const status = req.query.status;
	const startDate = req.query.startDate;

	try {
		const { rows: data } = await searchRentals(
			req,
			customerId,
			gameId,
			offset,
			limit,
			status,
			startDate
		);

		res.status(200).send(data);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function closeRental(req, res) {
	const { id } = req.params;

	try {
		const { rows: rental } = await isRentalRegistred(id);

		if (!rental.length) return res.sendStatus(404);

		if (rental[0].returnDate !== null) return res.sendStatus(400);

		await updateRental(rental, id);

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function deleteRental(req, res) {
	const { id } = req.params;

	try {
		const { rows: rental } = await isRentalRegistred(id);

		if (!rental.length) return res.sendStatus(404);

		if (rental[0].returnDate === null) return res.sendStatus(400);

		await deleteRentalQuery(id);

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function sendMetrics(req, res) {
	const startDate = req.query.startDate;
	const endDate = req.query.endDate;

	try {
		const { rows: metrics } = await metricsRentals(startDate, endDate);

		res.status(200).send(metrics);
	} catch (error) {}
}
