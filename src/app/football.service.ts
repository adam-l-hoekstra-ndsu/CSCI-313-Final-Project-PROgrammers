import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { TeamService } from './team.service';
import { Team } from './team';

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
