import axios from "axios";

export async function getLeaderboard(soloGameType, seasonId) {
  const endpoint = soloGameType ? "individual" : "team";
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/leaderboard/${endpoint}`,
      {
        params: { seasonId },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}
