import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Team } from './team'; //Team Class/Interface
import { teams } from './team-data'; //Team Data/Database
import { TeamService } from './team.service'; //TeamService
import { Player } from './player'; //Player Class/Interface
import { players } from './player-data'; //Player Data/Database
import { PlayerService } from './player.service'; //PlayerService

@Injectable({
  providedIn: 'root'
})

export class FootballService {
  constructor() { }
  statCategories: string[] = ["GamesPlayed", "YardsGained", "Tackles", "Fouls", "Completions", "PassesAttempted"]
  teams: Team[] = [];

  teamData = inject(TeamService);

  onInit() {
    this.teams = this.teamData.teams.filter(team => team.sport === 2); // Filter teams for Rainbow Six Siege
  }
}
