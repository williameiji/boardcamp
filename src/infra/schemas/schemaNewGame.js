import joi from "joi";

const schemaNewGame = joi.object({
	name: joi.string().required(),
	image: joi.string().uri().required(),
	stockTotal: joi.number().greater(0).required(),
	pricePerDay: joi.number().greater(0).required(),
	categoryId: joi.number().required(),
});

export default schemaNewGame;
