import React, { useState } from "react";
import { getLeaderboard } from "../services/Leaderboard";
import Video from "../components/Video.jsx";
import styled from "styled-components";
import arrow from "../assets/images/arrow.png";

const ContainerStyled = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
`;

const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  margin-top: 20px;
`;

const Inputs = styled.input`
  padding: 10px 20px;
  font-size: large;
  height: 20px;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  transition: background-color 0.3s;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: black; /* Change background color to black when hovered */
    color: white; /* Change text color to white when hovered */
  }
`;

const Title = styled.h1`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  font-family: Counter-Strike;
  font-weight: 500;
  z-index: 1;
  position: relative;
`;

export default function Leaderboard({ soloGameType }) {
  // const records = await getLeaderboard({ soloGameType });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = [
    { username: "João", score: 100 },
    { username: "Maria", score: 90 },
    { username: "Ana", score: 80 },
    { username: "Pedro", score: 70 },
    { username: "Carlos", score: 60 },
    { username: "Marta", score: 50 },
    { username: "Miguel", score: 40 },
    { username: "Rita", score: 30 },
    { username: "Sofia", score: 20 },
    { username: "Inês", score: 10 },
  ];
  const [column1, column2] = Object.keys(records[0]);
  const currentRecords = records.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(records.length / recordsPerPage);
  return (
    <>
      <Video />
      <ContainerStyled>
        <a href="/menu" style={{ marginLeft: "-93%", marginTop: "-6%" }}>
          <img
            src={arrow}
            style={{
              width: "46px",
              height: "46px",
            }}
          />
        </a>
        <Title>Leaderboard</Title>
        <table
          className="table"
          style={{
            borderSpacing: 20,
            fontSize: 30,
            textAlign: "center",
          }}
        >
          <thead>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </thead>
          <tbody>
            {currentRecords.map((record, i) => (
              <tr key={i}>
                <td>{firstIndex + i + 1}</td>
                <td>{record[column1]}</td>
                <td>{record[column2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <Options>
            <Inputs onClick={prePage} value={"Prev"} type={"text"}></Inputs>
            <Inputs
              className="page-link"
              onClick={nextPage}
              value={"Next"}
              type={"text"}
            ></Inputs>
          </Options>
        </nav>
      </ContainerStyled>
    </>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }
  function nextPage() {
    if (currentPage !== numberOfPages) setCurrentPage((prev) => prev + 1);
  }
}
