import connection from "../../databases/postgres.js";

async function editCustomerInformation(req, res, next) {
	const data = res.locals.data;
	const id = res.locals.id;

	try {
		await connection.query(
			"UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
			[data.name, data.phone, data.cpf, data.birthday, id]
		);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default editCustomerInformation;
