import connection from "../databases/postgres.js";

export async function searchCategories(limit, offset, req) {
	const columns = ["id", "name"];
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

	return await connection.query(
		`SELECT * 
        FROM categories 
        ORDER BY ${order} ${direction}
        LIMIT $1 OFFSET $2`,
		[limit, offset]
	);
}

export async function isCategoryRegistered(data) {
	return await connection.query("SELECT * FROM categories WHERE name = $1", [
		data.name,
	]);
}

export async function addNewCategory(data) {
	return await connection.query("INSERT INTO categories (name) VALUES ($1)", [
		data.name,
	]);
}

export async function isCategoryRegisteredById(id) {
	return await connection.query("SELECT * FROM categories WHERE id = $1", [id]);
}
