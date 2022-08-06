import { Router } from "express";

import {
	sendCostumers,
	sendCostumer,
	addCustomer,
	editCustomer,
} from "../controllers/customersController.js";

const customerRouter = Router();

customerRouter.get("/customers", sendCostumers);
customerRouter.get("/customers/:id", sendCostumer);
customerRouter.post("/customers", addCustomer);
customerRouter.put("/customers/:id", editCustomer);

export default customerRouter;
