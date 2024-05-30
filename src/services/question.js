import Question from "../models/question.js";

export async function getAllQuestions() {
  return await Question.find({});
}

export async function generateGameQuestions(providedDifficulty) {
  const numberOfQuestions = 20;
  const questions = [];
  if (providedDifficulty === "easy") {
    questions.push(
      await Question.aggregate()
        .match({ difficulty: providedDifficulty })
        .sample(20)
    );
  } else if (providedDifficulty === "medium") {
    const easyQuestions = await Question.aggregate()
      .match({ difficulty: "easy" })
      .sample(numberOfQuestions / 2);
    const mediumQuestions = await Question.aggregate()
      .match({ difficulty: "medium" })
      .sample(numberOfQuestions / 2);
    for (let i = 0; i < numberOfQuestions; i++) {
      if (i % 2 === 0) {
        questions.push(easyQuestions[i / 2]);
      } else {
        questions.push(mediumQuestions[i / 2]);
      }
    }
  } else if (providedDifficulty === "hard") {
    const easyQuestions = await Question.aggregate()
      .match({ difficulty: "easy" })
      .sample(numberOfQuestions / 2);
    const mediumQuestions = await Question.aggregate()
      .match({ difficulty: "medium" })
      .sample(numberOfQuestions / 2);
    const hardQuestions = await Question.aggregate()
      .match({ difficulty: "hard" })
      .sample(numberOfQuestions / 2);
    for (let i = 0; i < numberOfQuestions; i++) {
      if (i % 3 === 0) {
        questions.push(easyQuestions[i / 3]);
      } else if (i % 3 === 1) {
        questions.push(mediumQuestions[i / 3]);
      } else {
        questions.push(hardQuestions[i / 3]);
      }
    }
    return questions;
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
