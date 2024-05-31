import Game from "../models/game.js";
import { validateAwnser } from "./question.js";

export async function updateGame(
  providedGameId,
  questionDescription,
  providedAnswer
) {
  const points = validateAwnser(questionDescription, providedAnswer);
  await Game.updateOne(providedGameId, questionDescription, {
    answer: providedAnswer,
    points: points,
  });
}

export async function getGameResult(providedGameId) {
  const game = await Game.find({ gameId: providedGameId });
  let totalPoints = 0;
  for (const points of game.points) {
    totalPoints += points;
  }
  return totalPoints;
}

export async function getNextGameId() {
  const games = await Game.find({});
  if (games.length === 0) {
    return 1;
  }
  return games[games.length - 1].gameId + 1;
}

export async function createGame(gameId, questionsArray, entityName) {
  const answer = "awnser";
  const points = 0;
  for (const array of questionsArray) {
    for (const question of array) {
      const questionDescription = question.description;
      const game = new Game({
        gameId,
        questionDescription,
        entityName,
        answer,
        points,
      });
      await game.save();
    }
  }
}
