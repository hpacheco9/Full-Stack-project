import Question from "../models/question.js";

export async function getAllQuestions() {
  return await Question.find({});
}

export async function generateQuiz(providedDifficulty) {
  const numberOfQuestions = 20;
  const questions = [];
  if (providedDifficulty === "easy") {
    questions.push(
      await Question.find({
        difficulty: providedDifficulty,
      }).aggregate([{ $sample: { size: numberOfQuestions } }])
    );
  } else if (providedDifficulty === "medium") {
    const easyQuestions = await Question.find({ difficulty: "easy" });
    const mediumQuestions = await Question.find({ difficulty: "medium" });
    for (let i = 0; i < numberOfQuestions; i++) {
      if (i > 10) {
        const randomIndex = Math.floor(Math.random() * mediumQuestions.length);
        questions.push(mediumQuestions[randomIndex]);
        mediumQuestions.splice(randomIndex, 1);
      }
      const randomIndex = Math.floor(Math.random() * easyQuestions.length);
      questions.push(easyQuestions[randomIndex]);
      easyQuestions.splice(randomIndex, 1);
    }
  } else if (providedDifficulty === "hard") {
    const easyQuestions = await Question.find({ difficulty: "easy" });
    const mediumQuestions = await Question.find({ difficulty: "medium" });
    const hardQuestions = await Question.find({ difficulty: "hard" });
    for (let i = 0; i < numberOfQuestions; i++) {
      if (i > 10) {
        const randomIndex = Math.floor(Math.random() * hardQuestions.length);
        questions.push(hardQuestions[randomIndex]);
        hardQuestions.splice(randomIndex, 1);
      } else if (i > 5) {
        const randomIndex = Math.floor(Math.random() * mediumQuestions.length);
        questions.push(mediumQuestions[randomIndex]);
        mediumQuestions.splice(randomIndex, 1);
      }
      const randomIndex = Math.floor(Math.random() * easyQuestions.length);
      questions.push(easyQuestions[randomIndex]);
      easyQuestions.splice(randomIndex, 1);
    }
  }
  return question;
}
