import joi from "joi";

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
	birthday: joi.string().isoDate().required(),
});

export default schemaNewCustomer;
