import Game from "../models/game";
import { validateAwnser } from "./question";

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

export async function createGame(gameId, questions, entityName) {
  const answer = "";
  const points = 0;
  for (const question of questions) {
    const questionDescription = question.description;
    const game = new Game({
      gameId,
      questionDescription,
      entityName,
      answer,
      points,
    });
    return await game.save();
  }
}
