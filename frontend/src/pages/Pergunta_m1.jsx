import React from "react";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import Clock from "../components/clock";
import Image from "../components/Image";

const P = styled.p`
  font-size: 32px;
  color: white;
  margin-bottom: 5%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

export default function Question(props) {
  const { source, title, answers } = props;
  console.log("source", source);
  console.log("title", title);
  console.log("answers", answers);
  return (
    <Container>
      <Clock />
      <Image source={source} />
      <P>{title}</P>
      <div>
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            <div key={index}>
              <input type="radio" id={answer} name="answer" value={answer} />
              <label htmlFor={answer}>{answer}</label>
            </div>
          ))
        ) : (
          <p>No answers available</p>
        )}
      </div>
    </Container>
  );
}

Question.defaultProps = {
  answers: [],
};

Question.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string),
};
