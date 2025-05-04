import { Injectable, inject } from '@angular/core';
import { Team } from './team';
import { teams } from './team-data';
import { Player } from './player';
import { PlayerService } from './player.service';
import { Sport } from './sport';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
  
  teams = teams;

  playerService = inject(PlayerService);

  constructor() { }

  getTeam2(teamSport: Sport): Team {
    return this.teams.filter(team => team.sport == teamSport)[0];
  }

  getTeam(teamId: number): Team {
    return this.teams.filter(team => team.id == teamId)[0];
  }

  getPlayerIDs(teamId: number): number[] {
    return this.teams.filter(team => team.id == teamId)[0].players;
  }

  getPlayers(team: Team): Player[] {
    let toReturn:Player[] = []
    team.players.forEach((playerId) => {
      toReturn.push(this.playerService.getPlayerById(playerId))});
    return toReturn;
  }
}
