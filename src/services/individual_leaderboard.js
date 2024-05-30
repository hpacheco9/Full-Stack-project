import IndividualLeaderboard from "../models/individual_leaderboard";

export async function updateLeaderboard(username, score) {
  const user = await IndividualLeaderboard.findOne({ where: { username } });
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
  return await IndividualLeaderboard.findAll({
    order: [["score", "DESC"]],
    limit,
  });
}
