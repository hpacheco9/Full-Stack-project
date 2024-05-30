import TeamLeaderboard from "../models/team_leaderboard_leaderboard";

export async function updateLeaderboard(username, score) {
  const user = await TeamLeaderboard.findOne({ where: { username } });
  if (!user) {
    const newUser = new IndividualLeaderboard({
      username,
      score,
    });
    await newUser.save();
  } else {
    user.score += score;
    await user.save();
  }
}

export async function getLeaderboard(limit) {
  return await TeamLeaderboard.findAll({
    order: [["score", "DESC"]],
    limit,
  });
}
