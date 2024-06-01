import Team from "../models/team.js";
import Player from "../models/player.js";

export async function getTeams() {
  return await Team.findAll();
}

export async function createTeam(teamName, captain) {
  const team = new Team({
    teamName,
    captain,
  });
  await team.save();
  const player = await Player.findByPk(captain);
  await player.update({ teamId: team.teamId });
}

export async function invitePlayer(providedTeamId, playerName) {
  const player = await Player.findByPk(playerName);
  if (!player) {
    console.log(`jogador ${playerName} não existe`);
    return false;
  } else {
    if (player.teamId) {
      console.log(`O jogador ${playerName} já tem equipa`);
      return false;
    }
  }
  await player.update({ teamId: providedTeamId });
}

export async function getPlayers(providedTeamId) {
  return await Player.findAll({
    where: { teamId: providedTeamId },
  });
}

export async function getTeam(providedTeamName) {
  return await Team.findAll({
    where: { teamName: providedTeamName },
  });
}
