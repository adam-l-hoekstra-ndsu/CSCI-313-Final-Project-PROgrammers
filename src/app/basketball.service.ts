import { Injectable, inject} from '@angular/core';
import { Team } from './team';
import { teams } from './team-data';
import { Sport } from './sport';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})
export class BasketballService {

  statCategories: string[] = ["GP", "MIN", "PTS", "FG", "3P", "FT", "REB"]
  teams: Team[] = [];

  teamData = inject(TeamService);

  constructor() { }

  onInit() {
    this.teams = this.teamData.teams.filter(team => team.sport === Sport.Basketball);
  }

}
