import { Router } from "express";

import { sendGames } from "../controllers/gamesController.js";
import searchGames from "../infra/middlewares/searchGames.js";

const gamesRouter = Router();

gamesRouter.get("/games", searchGames, sendGames);

export default gamesRouter;
