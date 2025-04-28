import { Injectable } from '@angular/core';
import { Team } from './team';
import { teams } from './team-data';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teams = teams;

  constructor() { }

  getPlayerIDs(teamId: number): number[] {
    return this.teams.filter(team => team.id === teamId)[0].players;
  }
}
