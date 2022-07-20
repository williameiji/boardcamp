import { Router } from "express";

import {
	sendCostumers,
	sendCostumer,
} from "../controllers/customersController.js";
import searchCustomer from "../infra/middlewares/searchCustomer.js";
import searchCustomerById from "../infra/middlewares/searchCustomerById.js";

const customerRouter = Router();

customerRouter.get("/customers", searchCustomer, sendCostumers);
customerRouter.get("/customers/:id", searchCustomerById, sendCostumer);

export default customerRouter;
