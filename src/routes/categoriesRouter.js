import { Router } from "express";

import searchCategories from "../infra/middlewares/searchCategories.js";
import { sendCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", searchCategories, sendCategories);

export default categoriesRouter;
