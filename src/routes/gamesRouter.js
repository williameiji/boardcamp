import { Router } from "express";

import { sendGames, addGames } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/games", sendGames);
gamesRouter.post("/games", addGames);

export default gamesRouter;
