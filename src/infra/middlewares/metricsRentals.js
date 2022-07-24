import connection from "../../databases/postgres.js";

async function metricsRentals(req, res, next) {
	const startDate = req.query.startDate;
	const endDate = req.query.endDate;
	let queryWhere = null;

	if (startDate && endDate) {
		queryWhere = `BETWEEN '${startDate}' AND '${endDate}'`;
	} else if (startDate) {
		queryWhere = `>= '${startDate}'`;
	} else if (endDate) {
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
