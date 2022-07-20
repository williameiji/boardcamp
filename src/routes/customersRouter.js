import { Router } from "express";

import { sendCostumers } from "../controllers/customersController.js";
import searchCustomer from "../infra/middlewares/searchCustomer.js";

const customerRouter = Router();

customerRouter.use("/customers", searchCustomer, sendCostumers);

export default customerRouter;
