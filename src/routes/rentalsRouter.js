import { Router } from "express";

import {
	addRental,
	sendRentals,
	closeRental,
	deleteRental,
	sendMetrics,
} from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", sendRentals);

rentalsRouter.post("/rentals", addRental);

rentalsRouter.post("/rentals/:id/return", closeRental);

rentalsRouter.delete("/rentals/:id", deleteRental);

rentalsRouter.get("/rentals/metrics", sendMetrics);

export default rentalsRouter;
