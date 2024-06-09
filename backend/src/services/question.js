import { Question } from "../models/question.js";
import {
  BlanksQuestionType,
  BooleanQuestionType,
  MultipleValidQuestionType,
  OneValidQuestionType,
  QuestionType,
  difficulty,
} from "../models/question.js";

export async function getAllQuestions() {
  return await Question.find({});
}

export async function generateGameQuestions(providedDifficulty) {
  const questions = [];
  if (providedDifficulty === difficulty.EASY) {
    questions.push(await getQuestions(difficulty.EASY, 20));
    return questions;
  } else if (providedDifficulty === difficulty.MODERATE) {
    return (questions = [
      ...(await getQuestions(difficulty.EASY, 10)),
      ...(await getQuestions(difficulty.MODERATE, 10)),
    ]);
  } else if (providedDifficulty === difficulty.HARD) {
    return (questions = [
      ...(await getQuestions(difficulty.EASY, 5)),
      ...(await getQuestions(difficulty.MODERATE, 5)),
      ...(await getQuestions(difficulty.HARD, 10)),
    ]);
  }
}

async function getQuestions(providedDifficulty, sampleSize) {
  return await Question.aggregate()
    .match({ difficulty: providedDifficulty })
    .sample(sampleSize);
}

export async function seedQuestionTypes() {
  const types = [
    { description: BooleanQuestionType },
    { description: BlanksQuestionType },
    { description: OneValidQuestionType },
    { description: MultipleValidQuestionType },
  ];

  const questionTypeCount = await QuestionType.countDocuments();
  if (questionTypeCount == 0) {
    await QuestionType.insertMany(types);
  }
}

export async function validateAwnser(questionDesciption, awnser) {
  const question = await Question.findOne({ description: questionDesciption });
  const options = question.options;
  for (const option of options) {
    if (option.correct && option.title === awnser) {
      return question.points;
    } else {
      return 0;
    }
  }
}
