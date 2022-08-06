import joi from "joi";

export default function schemasValidator(req, data) {
	if (req.method === "POST" && req.url == "/categories") {
		const schemaNewCategorie = joi.object({
			name: joi.string().required(),
		});

		const { error } = schemaNewCategorie.validate(data);

		return error;
	}

	if (req.method === "POST" && req.url == "/customers") {
		const schemaNewCustomer = joi.object({
			name: joi.string().required(),
			phone: joi
				.string()
				.pattern(/^[0-9]{10,11}$/)
				.required(),
			cpf: joi
				.string()
				.pattern(/^[0-9]{11}$/)
				.required(),
			birthday: joi.date().less("now").iso().required(),
		});

		const { error } = schemaNewCustomer.validate(data);

		return error;
	}

	if (req.method === "POST" && req.url == "/games") {
		const schemaNewGame = joi.object({
			name: joi.string().required(),
			image: joi.string().uri().required(),
			stockTotal: joi.number().greater(0).required(),
			pricePerDay: joi.number().greater(0).required(),
			categoryId: joi.number().required(),
		});

		const { error } = schemaNewGame.validate(data);

		return error;
	}
}
