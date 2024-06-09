import { Router } from "express";
import { authGuard } from "../middlewares/authGuard.js";
import { checkSchema } from "express-validator";
import { validateSchema } from "../middlewares/validation.js";
import { generateGameQuestions } from "../services/question.js";
import { createGame, getNextGameId } from "../services/game.js";
import { validateGame } from "../services/season.js";
const router = Router();

const gameStartSchema = checkSchema({
  difficulty: {
    errorMessage: "Invalid difficulty",
    isNumeric: true,
    notEmpty: true,
  },
  soloGameType: {
    errorMessage: "Invalid game type",
    notEmpty: true,
    isBoolean: true,
  },
});

router.post("/", [gameStartSchema, validateSchema], async (req, res) => {
  const { difficulty, soloGameType } = req.body;
  let entityName = "";
  if (soloGameType === true) {
    entityName = "Miguel";
  } else {
    entityName = "team_name";
  }
  const validSeason = await validateGame(new Date());
  if (!validSeason) {
    return res.status(400).send();
  }
  const questions = await generateGameQuestions(difficulty);
  const gameId = await getNextGameId();
  createGame(gameId, validSeason[0].seasonId, questions, entityName);
  res.json({});
});

export default router;
