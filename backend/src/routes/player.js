import { Router } from "express";
import { getPlayer } from "../services/player.js";

const router = Router();

router.get("/player", async (req, res) => {
  const { playerName } = req.body;
  res.json(await getPlayer(playerName));
});

export default router;
