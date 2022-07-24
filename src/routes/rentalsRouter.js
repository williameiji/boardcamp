import { Router } from "express";

import {
	addRental,
	sendRentals,
	closeRental,
	deleteRental,
	sendMetrics,
} from "../controllers/rentalsController.js";
import newRentalValidator from "../infra/validators/newRentalValidator.js";
import newRental from "../infra/middlewares/newRental.js";
import searchRentals from "../infra/middlewares/searchRentals.js";
import closeRentalValidator from "../infra/validators/closeRentalValidator.js";
import closeRentalInformation from "../infra/middlewares/closeRentalInformation.js";
import deleteRentalValidator from "../infra/validators/deleteRentalValidator.js";
import deleteRentalInformation from "../infra/middlewares/deleteRentalInformation.js";
import metricsRentals from "../infra/middlewares/metricsRentals.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", newRentalValidator, newRental, addRental);
rentalsRouter.get("/rentals", searchRentals, sendRentals);
rentalsRouter.post(
	"/rentals/:id/return",
	closeRentalValidator,
	closeRentalInformation,
	closeRental
);
rentalsRouter.delete(
	"/rentals/:id",
	deleteRentalValidator,
	deleteRentalInformation,
	deleteRental
);
rentalsRouter.get("/rentals/metrics", metricsRentals, sendMetrics);

export default rentalsRouter;
