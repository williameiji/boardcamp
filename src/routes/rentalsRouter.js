import { Router } from "express";

import newRentalValidator from "../infra/validators/newRentalValidator.js";
import newRental from "../infra/middlewares/newRental.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", newRentalValidator, newRental);

export default rentalsRouter;
