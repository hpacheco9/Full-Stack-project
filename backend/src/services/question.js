import { Question } from "../models/question.js";
import {
  BlanksQuestionType,
  BooleanQuestionType,
  MultipleValidQuestionType,
  OneValidQuestionType,
  QuestionType,
} from "../models/question.js";

export async function getAllQuestions() {
  return await Question.find({});
}

export async function generateGameQuestions(providedDifficulty) {
  const questions = [];
  if (providedDifficulty === "easy") {
    const easyQuestions = await Question.aggregate()
      .match({ difficulty: providedDifficulty })
      .sample(21);
    questions.push(easyQuestions);
    return questions;
  } else if (providedDifficulty === "moderate") {
    const easyQuestions = await Question.aggregate()
      .match({ difficulty: "easy" })
      .sample(10);
    const mediumQuestions = await Question.aggregate()
      .match({ difficulty: "moderate" })
      .sample(10);
    questions.push(easyQuestions);
    questions.push(mediumQuestions);
    return questions;
  } else if (providedDifficulty === "hard") {
    const easyQuestions = await Question.aggregate()
      .match({ difficulty: "easy" })
      .sample(5);
    const mediumQuestions = await Question.aggregate()
      .match({ difficulty: "moderate" })
      .sample(5);
    const hardQuestions = await Question.aggregate()
      .match({ difficulty: "hard" })
      .sample(10);
    questions.push(easyQuestions);
    questions.push(mediumQuestions);
    questions.push(hardQuestions);
    return questions;
  }
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
