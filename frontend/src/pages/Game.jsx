import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import text from "../assets/images/text.png";
import { ContainerStyled } from "../components/ContainerStyled";
import Video from "../components/Video";
import { Options } from "../components/Options.jsx";
import styled, { css } from "styled-components";
import { Anchor } from "../components/Anchor";
import { Title } from "../components/Title";
import { Paragrafo } from "../components/Paragrafo";
import { SubmitButton } from "../components/Form";
import { updateGame, getGameResult } from "../services/Game.js";

const Inputs = styled.input`
  padding: 10px 20px;
  font-size: large;
  height: 70px;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  transition: background-color 0.3s;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.clicked &&
    css`
      background-color: black; /* Change background color to black when clicked */
      color: white; /* Change text color to white when clicked */
    `}

  &:hover {
    background-color: black; /* Change background color to black when hovered */
    color: white; /* Change text color to white when hovered */
  }
`;

export default function Game() {
  const location = useLocation();
  const { state } = location || {};
  const { game, questions } = state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const gameId = game[0].gameId;

  useEffect(() => {
    const fetchScore = async () => {
      try {
        if (currentQuestionIndex === null) {
          const data = await getGameResult(gameId);
          setScore(data);
        }
      } catch (error) {
        console.error("Error fetching game result:", error);
      }
    };

    if (currentQuestionIndex === null) {
      fetchScore();
    }
  }, [currentQuestionIndex, gameId]);

  if (score !== null) {
    console.log("SCORE", score);
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((result) => (result = currentQuestionIndex + 1));
    } else {
      setCurrentQuestionIndex(null);
    }
  }

  function renderQuestion() {
    if (!game) {
      return <p>Loading game...</p>;
    }

    if (questions[0].length === 0) {
      return <p>No questions available.</p>;
    }

    if (currentQuestionIndex === null) {
      return <Endscreen score={score} />;
    }

    const question = questions[currentQuestionIndex];

    switch (question.type) {
      case "boolean":
        return (
          <Boolean
            question={question}
            onNext={nextQuestion}
            options={question.options}
            gameId={gameId}
          />
        );
      case "blanks":
        return (
          <Blanks
            question={question}
            onNext={nextQuestion}
            options={question.options}
            gameId={gameId}
          />
        );
      case "oneValid":
        return (
          <OneValid
            question={question}
            onNext={nextQuestion}
            options={question.options}
            gameId={gameId}
          />
        );
      case "multipleValid":
        return (
          <MultipleValid
            question={question}
            onNext={nextQuestion}
            options={question.options}
            gameId={gameId}
          />
        );
      default:
        return <Endscreen score={score} />;
    }
  }

  return (
    <>
      <Video />
      <div>{renderQuestion()}</div>
    </>
  );
}

function QuestionHeader({ question, children }) {
  return (
    <>
      <ContainerStyled>
        <img src={text} alt="question" style={{ marginBottom: "5%" }} />
        <p style={{ fontSize: "30px", marginBottom: "40px" }}>
          {question.description}
        </p>
        {children}
      </ContainerStyled>
    </>
  );
}

function Navigation({ onNext, answer, gameId, questionDescription }) {
  async function atualizarGame(answer) {
    if (questionDescription !== null) {
      await updateGame(gameId, questionDescription, answer);
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={() => (atualizarGame(answer), onNext())}
        style={{ fontSize: "25px", borderRadius: "5px" }}
      >
        Next
      </button>
    </>
  );
}

function Boolean({ question, onNext, options, gameId }) {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [answer, setAnswer] = useState(null);

  const handleClick = (index, answer) => {
    setClickedIndex(index === clickedIndex ? null : index);
    setAnswer(answer);
  };

  return (
    <QuestionHeader question={question}>
      <Options>
        {options.length > 0 ? (
          options.map((option, index) => (
            <Inputs
              type="button"
              value={option.title}
              clicked={clickedIndex === index}
              onClick={() => handleClick(index, option.title)}
            ></Inputs>
          ))
        ) : (
          <p>No options available</p>
        )}
      </Options>
      <Navigation
        onNext={onNext}
        answer={answer}
        gameId={gameId}
        questionDescription={question.description}
      />
    </QuestionHeader>
  );
}

function Blanks({ question, onNext, options, gameId }) {
  const [answer, setAnswer] = useState(null);

  return (
    <QuestionHeader question={question}>
      <input
        type="text"
        placeholder="Awnser"
        style={{
          fontSize: "20px",
          height: "50px",
          width: "350px",
          marginBottom: "20px",
        }}
        onChange={(e) => setAnswer(e.target.value)}
      ></input>
      <Options>
        {options.length > 0 ? (
          options.map((option, index) => (
            <Inputs type="button" value={option.title}></Inputs>
          ))
        ) : (
          <p>No options available</p>
        )}
      </Options>
      <Navigation
        onNext={onNext}
        answer={answer}
        gameId={gameId}
        questionDescription={question.description}
      />
    </QuestionHeader>
  );
}

function OneValid({ question, onNext, options, gameId }) {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [answer, setAnswer] = useState(null);

  const handleClick = (index, answer) => {
    setClickedIndex(index === clickedIndex ? null : index);
    setAnswer(answer);
  };

  return (
    <QuestionHeader question={question}>
      <Options>
        {options.length > 0 ? (
          options.map((option, index) => (
            <Inputs
              type="button"
              value={option.title}
              clicked={clickedIndex === index}
              onClick={() => handleClick(index, option.title)}
            ></Inputs>
          ))
        ) : (
          <p>No options available</p>
        )}
      </Options>
      <Navigation
        onNext={onNext}
        answer={answer}
        gameId={gameId}
        questionDescription={question.description}
      />
    </QuestionHeader>
  );
}

function MultipleValid({ question, onNext, options, gameId }) {
  const [clickedIndices, setClickedIndices] = useState([]);
  const [answer, setAnswer] = useState([]);

  const handleClick = (index, title) => {
    let newClickedIndices;
    let newAnswer;

    let correctAnswerLenght = () => {
      let correct = 0;
      for (let i = 0; i < options.length; i++) {
        if (options[i].correct) {
          correct++;
        }
      }
      return correct;
    };

    if (clickedIndices.includes(index)) {
      newClickedIndices = clickedIndices.filter((i) => i !== index);
      newAnswer = answer.filter((ans) => ans !== title);
    } else if (clickedIndices.length < correctAnswerLenght()) {
      newClickedIndices = [...clickedIndices, index];
      newAnswer = [...answer, title];
    } else {
      newClickedIndices = [clickedIndices[1], index];
      newAnswer = [answer[1], title];
    }

    setClickedIndices(newClickedIndices);
    setAnswer(newAnswer);
  };

  return (
    <QuestionHeader question={question}>
      <Options>
        {options.length > 0 ? (
          options.map((option, index) => (
            <Inputs
              key={index}
              type="button"
              value={option.title}
              clicked={clickedIndices.includes(index)}
              onClick={() => handleClick(index, option.title)}
            />
          ))
        ) : (
          <p>No options available</p>
        )}
      </Options>
      <Navigation
        onNext={onNext}
        answer={answer}
        gameId={gameId}
        questionDescription={question.description}
      />
    </QuestionHeader>
  );
}

function Endscreen({ score }) {
  return (
    <>
      <Video />
      <ContainerStyled>
        <Title>Pontuação</Title>
        <Paragrafo>{score.points} pts.</Paragrafo>
        <SubmitButton>
          <Anchor href="/menu">Home</Anchor>
        </SubmitButton>
      </ContainerStyled>
    </>
  );
}
