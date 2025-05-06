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

  createTeam(named: string, sports: Sport, logo:string, league:string){
    let t:Team = {
      id: teams.length,
      name: named,
      sport: sports,
      logoUrl: logo,
      players: [],
      schedule: [],
      wins: 0,
      losses: 0,
      draws: 0,
      legueSubsection: league
    }
    teams.push(t)
  }

  editTeam(t:Team, name: string, league: string, logo: string) {
    t.name = name
    t.legueSubsection = league
    t.logoUrl = logo
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
