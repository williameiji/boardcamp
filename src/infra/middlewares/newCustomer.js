import connection from "../../databases/postgres.js";

async function newCustomer(req, res, next) {
	const data = res.locals.data;

	try {
		await connection.query(
			`INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4)`,
			[data.name, data.phone, data.cpf, data.birthday]
		);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default newCustomer;
