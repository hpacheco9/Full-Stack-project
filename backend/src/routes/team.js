import { Router } from "express";
import {
  createTeam,
  invitePlayer,
  getTeam,
  getPlayers,
} from "../services/team.js";

const router = Router();

router.post("/", async (req, res) => {
  const { teamName, captain } = req.body;
  await createTeam(teamName, captain);
  res.json({});
});

router.post("/invite", async (req, res) => {
  const { providedTeamId, playerName } = req.body;
  await invitePlayer(providedTeamId, playerName);
  res.json({});
});

router.get("/players", async (req, res) => {
  const { teamId } = req.body;
  const players = await getPlayers(teamId);
  res.json(players);
});

router.get("/team", async (req, res) => {
  const { teamName } = req.body;
  const team = await getTeam(teamName);
  res.json(team);
});

export default router;
