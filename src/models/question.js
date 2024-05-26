import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  options: [
    {
      title: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
      },
    },
  ],
  points: {
    type: Number,
    required: true,
    default: function () {
      if (this.difficulty === "easy") {
        return 1;
      } else if (this.difficulty === "medium") {
        return 2;
      } else if (this.difficulty === "hard") {
        return 3;
      }
    },
  },
});

const Question = mongoose.model("Questions", questionSchema);

export default Question;
