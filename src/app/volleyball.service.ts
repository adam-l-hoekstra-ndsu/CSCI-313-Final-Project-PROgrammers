import { inject, Injectable } from '@angular/core';
import { Team } from './team';
import { TeamService } from './team.service';
import { Sport } from './sport';

@Injectable({
  providedIn: 'root',
})
export class VolleyballService {
  statCategories: string[] = [
    'Serves',
    'Aces',
    'Kills',
    'Digs',
    'Receptions',
    'Assists',
    'Errors',
    'Solo Blocks',
    'Block Assists',
  ];
  teams: Team[] = [];

  teamData = inject(TeamService);

  constructor() {}

  onInit() {
    this.teams = this.teamData.teams.filter(
      (team) => team.sport === Sport.Volleyball
    ); // Filter teams for Volleyball
  }
}
