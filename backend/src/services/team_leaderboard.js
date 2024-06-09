import TeamLeaderboard from "../models/team_leaderboard.js";

export async function updateTeamLeaderboard(teamName, score, seasonId) {
  const user = await TeamLeaderboard.findOne({
    where: { teamName, seasonId },
  });
  if (!user) {
    const newUser = new TeamLeaderboard({
      seasonId,
      teamName,
      score,
    });
    await newUser.save();
  } else {
    user.score += score;
    await user.save();
  }
}

export async function getTeamLeaderboard(limit, seasonId) {
  return await TeamLeaderboard.findAll({
    where: { seasonId },
    order: [["score", "DESC"]],
    limit,
  });
}
