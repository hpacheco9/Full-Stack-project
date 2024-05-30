import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { validateSchema } from "../middlewares/validation";
import { generateGameQuestions } from "../services/question";
import {
  createGame,
  updateGame,
  getNextGameId,
  getGameResult,
} from "../services/game";
import { updateLeaderboard } from "../services/individual_leaderboard";
import { updateLeaderboard } from "../services/team_leaderboard";

const router = Router();

const gameStartSchema = checkSchema({
  difficulty: {
    errorMessage: "Invalid difficulty",
    isString: true,
    notEmpty: true,
  },
  soloGameType: {
    errorMessage: "Invalid game type",
    notEmpty: true,
    isBoolean: true,
  },
});

router.post(
  "/game",
  [authGuard, gameStartSchema, validateSchema],
  (req, res) => {
    const { difficulty, soloGameType } = req.body;
    let entityName = "";
    if (soloGameType === "true") {
      entityName = req.session.user.username;
    } else {
      entityName = "team_name";
    }
    const questions = generateGameQuestions(difficulty);
    const gameId = getNextGameId();
    createGame(gameId, questions, entityName);

    /*
    for (let i = 0; i < questions.length; i++) {
      if questions[i].type === "vf") {
        res.render("question_vf", {
          question: questions[i].description,
          options: questions[i].options,
          image: questions[i].image,
        });
        const awnser = req.body.awnser;
        updateGame(gameId, questions[i].description, awnser);
      } else if (questions[i].type === "espacos") {
        res.render("question_espacos", {
          question: questions[i].description,
          options: questions[i].options,
          image: questions[i].image,
        });
        const awnser = req.body.awnser;
        updateGame(gameId, questions[i].description, awnser);
      } else if (questions[i].type === "mais1") {
        res.render("question_mais1", {
          question: questions[i].description,
          options: questions[i].options,
          image: questions[i].image,
        });
        const awnser = req.body.awnser;
        updateGame(gameId, questions[i].description, awnser);
      } else if (questions[i].type === "m1") {
        res.render("question_m1", {
          question: questions[i].description,
          options: questions[i].options,
          image: questions[i].image,
        });
        const awnser = req.body.awnser;
        updateGame(gameId, questions[i].description, awnser);
      }
    }
    const result = getGameResult(gameId);
    if (soloGameType === "true") {
      updateLeaderboard(req.session.user.username, result);
    } else {
      updateLeaderboard("team_name", result);
    }
    res.render("game_result", { result });
    */
  }
);

export default router;
