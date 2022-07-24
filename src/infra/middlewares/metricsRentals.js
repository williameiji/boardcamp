import connection from "../../databases/postgres.js";

async function metricsRentals(req, res, next) {
	const startDate = req.query.startDate;
	const endDate = req.query.endDate;
	let queryWhere = null;

	function validateDate(element) {
		let regex = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/;
		return regex.test(element);
	}

	if (validateDate(startDate) && validateDate(endDate)) {
		queryWhere = `BETWEEN '${startDate}' AND '${endDate}'`;
	} else if (validateDate(startDate)) {
		queryWhere = `>= '${startDate}'`;
	} else if (validateDate(endDate)) {
		queryWhere = `<= '${startDate}'`;
	}

	try {
		if (queryWhere) {
			const { rows: metrics } = await connection.query(`
            SELECT SUM(COALESCE("originalPrice", 0) + COALESCE("delayFee", 0)) as revenue, COUNT(id) as rentals, ROUND(AVG("originalPrice")) as average
            FROM rentals
            WHERE rentals."rentDate" ${queryWhere}
        `);

			res.locals.metrics = metrics[0];

			next();
		}

		const { rows: metrics } = await connection.query(`
            SELECT SUM(COALESCE("originalPrice", 0) + COALESCE("delayFee", 0)) as revenue, COUNT(id) as rentals, ROUND(AVG("originalPrice")) as average
            FROM rentals
        `);

		res.locals.metrics = metrics[0];

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default metricsRentals;
