import { Router } from "express";
import {
  getIndividualLeaderboard,
  updateIndividualLeaderboard,
} from "../services/individual_leaderboard.js";
import {
  getTeamLeaderboard,
  updateTeamLeaderboard,
} from "../services/team_leaderboard.js";

const router = Router();

router.get("/individual", async (req, res) => {
  const { seasonId } = req.query;
  try {
    const leaderboard = await getIndividualLeaderboard(seasonId);
    return res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching individual leaderboard:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/team", async (req, res) => {
  const { seasonId } = req.query;
  try {
    const leaderboard = await getTeamLeaderboard(seasonId);
    return res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching team leaderboard:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/individual", async (req, res) => {
  const { username, score, seasonId } = req.body;
  await updateIndividualLeaderboard(username, score, seasonId);
  res.json({});
});

router.post("/team", async (req, res) => {
  const { teamName, score, seasonId } = req.body;
  await updateTeamLeaderboard(teamName, score, seasonId);
  res.json({});
});

export default router;
