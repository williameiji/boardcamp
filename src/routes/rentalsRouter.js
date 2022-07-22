import { Router } from "express";

import {
	addRental,
	sendRentals,
	closeRental,
} from "../controllers/rentalsController.js";
import newRentalValidator from "../infra/validators/newRentalValidator.js";
import newRental from "../infra/middlewares/newRental.js";
import searchRentals from "../infra/middlewares/searchRentals.js";
import closeRentalValidator from "../infra/validators/closeRentalValidator.js";
import closeRentalInformation from "../infra/middlewares/closeRentalInformation.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", newRentalValidator, newRental, addRental);
rentalsRouter.get("/rentals", searchRentals, sendRentals);
rentalsRouter.post(
	"/rentals/:id/return",
	closeRentalValidator,
	closeRentalInformation,
	closeRental
);

export default rentalsRouter;
