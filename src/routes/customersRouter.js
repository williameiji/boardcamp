import { Router } from "express";

import {
	sendCostumers,
	sendCostumer,
	addCustomer,
} from "../controllers/customersController.js";
import searchCustomer from "../infra/middlewares/searchCustomer.js";
import searchCustomerById from "../infra/middlewares/searchCustomerById.js";
import newCustomerValidator from "../infra/validators/newCustomerValidator.js";
import newCustomer from "../infra/middlewares/newCustomer.js";

const customerRouter = Router();

customerRouter.get("/customers", searchCustomer, sendCostumers);
customerRouter.get("/customers/:id", searchCustomerById, sendCostumer);
customerRouter.post(
	"/customers",
	newCustomerValidator,
	newCustomer,
	addCustomer
);

export default customerRouter;
