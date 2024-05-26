import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { validateSchema } from "../middlewares/validation";

const router = Router();

const gameStartSchema = checkSchema({
  difficulty: {
    errorMessage: "Invalid difficulty",
    isString: true,
    notEmpty: true,
  },
  soloGameType: {
    errorMessage: "Invalid game type",
    notEmpty: true,
    isBoolean: true,
  },
});

router.post(
  "/game",
  [authGuard, gameStartSchema, validateSchema],
  (req, res) => {}
);

export default router;
