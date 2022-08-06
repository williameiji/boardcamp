import connection from "../databases/postgres.js";

export async function searchCustomer(req, cpf, limit, offset) {
	const columns = ["id", "name", "phone", "cpf", "birthday"];
	let order;
	let direction = "ASC";

	if (columns.some((item) => item === req.query.order)) {
		order = `"${req.query.order}"`;
	} else {
		order = "id";
	}

	if (req.query.desc) {
		direction = "DESC";
	}

	if (!cpf) {
		return await connection.query(
			`SELECT *, (SELECT COUNT(rentals."customerId") FROM rentals WHERE customers.id = rentals."customerId") as "rentalsCount"
				FROM customers 
				ORDER BY ${order} ${direction}
				LIMIT $1 OFFSET $2`,
			[limit, offset]
		);
	} else {
		return await connection.query(
			`SELECT *, (SELECT COUNT(rentals."customerId") FROM rentals WHERE customers.id = rentals."customerId") as "rentalsCount"
			FROM  customers 
			WHERE cpf 
			LIKE '%' || $1 || '%' 
			ORDER BY ${order} ${direction}
			LIMIT $2 OFFSET $3`,
			[cpf, limit, offset]
		);
	}
}

export async function searchCustomerById(id) {
	return await connection.query(
		"SELECT * FROM customers WHERE customers.id = $1",
		[id]
	);
}

export async function isCustomerRegistred(data) {
	return await connection.query("SELECT cpf FROM customers WHERE cpf = $1", [
		data.cpf,
	]);
}

export async function addNewCustomer(data) {
	return await connection.query(
		`INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4)`,
		[data.name, data.phone, data.cpf, data.birthday]
	);
}

export async function idFromCpf(data, id) {
	return await connection.query(
		`
        SELECT * FROM customers
        WHERE customers.id = $1 AND customers.cpf = $2
    `,
		[id, data.cpf]
	);
}

export async function updateCustomer(data, id) {
	return await connection.query(
		"UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
		[data.name, data.phone, data.cpf, data.birthday, id]
	);
}
