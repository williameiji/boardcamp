import { Router } from "express";

import { sendGames, addGames } from "../controllers/gamesController.js";
import searchGames from "../infra/middlewares/searchGames.js";
import newGameValidator from "../infra/validators/newGameValidator.js";
import newGame from "../infra/middlewares/newGame.js";

const gamesRouter = Router();

gamesRouter.get("/games", searchGames, sendGames);
gamesRouter.post("/games", newGameValidator, newGame, addGames);

export default gamesRouter;
