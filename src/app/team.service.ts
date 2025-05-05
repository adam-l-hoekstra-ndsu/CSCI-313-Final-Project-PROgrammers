import { Injectable, inject } from '@angular/core';
import { Team } from './team';
import { teams } from './team-data';
import { Player } from './player';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
  
  teams = teams;

  playerService = inject(PlayerService);

  constructor() { }

  getTeam(teamId: number): Team {
    return this.teams.filter(team => team.id == teamId)[0];
  }

  getPlayerIDs(teamId: number): number[] {
    return this.teams.filter(team => team.id == teamId)[0].players;
  }

  playerLeave(plrId: Player, teamId:Team) {
    const teamSpec: Team = this.getTeam(teamId.id)
    const index = teamSpec.players.indexOf(plrId.id,0)
    teamSpec.players.splice(index,1)
  }

  playerJoin(plr :Player, team: Team) {
    const teamSpec: Team = this.getTeam(team.id)
    const index = teamSpec.players.indexOf(plr.id,0)
    teamSpec.players.push(plr.id)
  }

  getPlayers(team: Team): Player[] {
    let toReturn:Player[] = []
    team.players.forEach((playerId) => {
      toReturn.push(this.playerService.getPlayerById(playerId))});
    return toReturn;
  }
}
