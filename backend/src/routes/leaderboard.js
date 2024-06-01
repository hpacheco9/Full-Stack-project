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
  const { seasonId, limit } = req.body;
  const leaderboard = await getIndividualLeaderboard(limit, seasonId);
  res.json(leaderboard);
});

router.get("/team", async (req, res) => {
  const { seasonId, limit } = req.body;
  const leaderboard = await getTeamLeaderboard(limit, seasonId);
  res.json(leaderboard);
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
