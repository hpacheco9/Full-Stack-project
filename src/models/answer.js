/*
import mongoose from "mongoose";

const {Schema} = mongoose;

const answerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Questions",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
});

const Answer = mongoose.model("Answers", answerSchema);

export default Answer;
*/