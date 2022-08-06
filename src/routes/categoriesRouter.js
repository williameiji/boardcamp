import { Router } from "express";

import {
	sendCategories,
	addCategory,
} from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", sendCategories);
categoriesRouter.post("/categories", addCategory);

export default categoriesRouter;
