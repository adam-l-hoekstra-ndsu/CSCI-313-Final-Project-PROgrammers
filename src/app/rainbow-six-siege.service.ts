import { Injectable, inject} from '@angular/core';
import { Team } from './team';
import { teams } from './team-data';
import { TeamService } from './team.service'
import { SiegeRoundResult } from './quarterOrRound';
import { Sport } from './sport';

export enum SiegeCatagory {
  Kills,
  Deaths,
  Assists,
  ObjectivePlays,
  RoundsSurvived,
  Trades,
  Revives,
  Clutches
}

@Injectable({
  providedIn: 'root'
})

export class RainbowSixSiegeService {
  statCategories: string[] = ["Kills", "Deaths", "Assists", "Objective Plays", "Rounds Survied", "Trades", "Revives", "Clutches"]
  teams: Team[] = [];

  teamData = inject(TeamService);

  constructor() { }

  onInit() {
    this.teams = this.teamData.teams.filter(team => team.sport === Sport.RainbowSixSiege); // Filter teams for Rainbow Six Siege
  }

}
