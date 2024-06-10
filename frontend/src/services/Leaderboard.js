import axios from "axios";

export async function getLeaderboard({ soloGameType }) {
  if (soloGameType === true) {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/leaderboard/individual`
    );
    if (response.status === 200) {
      return response.data;
    }
  }
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/leaderboard/team`
  );
  if (response.status === 200) {
    return response.status;
  }
  return null;
}
