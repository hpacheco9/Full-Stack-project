import React, { useState, useEffect } from "react";
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
    background-color: black;
    color: white;
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

export default function Leaderboard({ soloGameType, seasonId }) {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getLeaderboard(soloGameType, seasonId);
        setRecords(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchRecords();
  }, [soloGameType, seasonId]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = records.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(records.length / recordsPerPage);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const columns = records.length > 0 ? Object.keys(records[0]) : [];
  const nameColumn = columns[1];

  return (
    <>
      <Video />
      <ContainerStyled>
        <a href="/menu" style={{ marginLeft: "-93%", marginTop: "-6%" }}>
          <img
            src={arrow}
            style={{ width: "46px", height: "46px" }}
            alt="arrow"
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
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, i) => (
              <tr key={i}>
                <td>{firstIndex + i + 1}</td>
                <td>{record[nameColumn]}</td>
                <td>{record.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <Options>
            <Inputs onClick={prePage} value={"Prev"} type={"text"}></Inputs>
            <Inputs onClick={nextPage} value={"Next"} type={"text"}></Inputs>
          </Options>
        </nav>
      </ContainerStyled>
    </>
  );
}
