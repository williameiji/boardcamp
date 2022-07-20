import { Router } from "express";

import {
	sendCategories,
	addCategory,
} from "../controllers/categoriesController.js";
import searchCategories from "../infra/middlewares/searchCategories.js";
import newCategoriesValidator from "../infra/validators/newCategoriesValidator.js";
import newCategory from "../infra/middlewares/newCategory.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", searchCategories, sendCategories);
categoriesRouter.post(
	"/categories",
	newCategoriesValidator,
	newCategory,
	addCategory
);

export default categoriesRouter;
