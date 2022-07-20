import { Router } from "express";

import {
	sendCategories,
	addCategorie,
} from "../controllers/categoriesController.js";
import searchCategories from "../infra/middlewares/searchCategories.js";
import newCategoriesValidator from "../infra/validators/newCategoriesValidator.js";
import newCategorie from "../infra/middlewares/newCategorie.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", searchCategories, sendCategories);
categoriesRouter.post(
	"/categories",
	newCategoriesValidator,
	newCategorie,
	addCategorie
);

export default categoriesRouter;
