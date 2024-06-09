import Player from "../models/player.js";

export async function createPlayer(username) {
  const teamId = null;
  const player = await getPlayer(username);
  if (player) {
    console.log(`jogador ${username} já existe`);
    return false;
  }
  const newPlayer = new Player({
    username,
    teamId,
  });
  await newPlayer.save();
}

export async function getPlayer(username) {
  return await Player.findByPk(username);
}
