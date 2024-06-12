import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function Game() {
  const location = useLocation();
  const { state } = location || {};
  const { difficulty, mode } = state || {};

  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");

  return (
    <div>
      <h1>Game</h1>
    </div>
  );
}

function QuestionHeader({ children }) {
  return (
    <>
      <h2>Title</h2>
      <p>Question</p>
      {children}
    </>
  );
}

function Boolean(props) {
  return <QuestionHeader></QuestionHeader>;
}

function Blanks(props) {
  return <QuestionHeader></QuestionHeader>;
}

function OneValid(props) {
  return <QuestionHeader></QuestionHeader>;
}

function MultipleValid(props) {
  return <QuestionHeader></QuestionHeader>;
}
