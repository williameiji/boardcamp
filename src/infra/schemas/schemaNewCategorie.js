import joi from "joi";

const schemaNewCategorie = joi.object({
	name: joi.string().required(),
});

export default schemaNewCategorie;
