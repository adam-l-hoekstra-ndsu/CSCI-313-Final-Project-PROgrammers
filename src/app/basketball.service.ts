import { Injectable, inject } from '@angular/core';
import { Team } from './team';
import { Sport } from './sport';
import { TeamService } from './team.service';
import { Player } from './player';
import { Play } from './play';
import { Match } from './match';
import { QuarterOrRound } from './quarterOrRound';

export enum BasketballCategory {
  GP,
  MIN,
  PTS,
  FG,
  P3,
  FT,
  REB
}

export enum BasketBallPlayType {
  EnteredGame = "Entered Game",
  ExitedGame = "Exited Game",
  FGMade = "Made a Field Goal",
  FGMissed = "Missed a Field Goal",
  P3Made = "Made a 3 Point Field Goal",
  P3Missed = "Missed a 3 Point Field Goal",
  FTMade = "Made a Free Throw",
  FTMissed = "Missed a Free Throw",
  Rebound = "Got a rebound",
}

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

  playDescriptionBuilderAssist(playerActing: Player, playerEffected: Player, playerAssisting: Player, playAction: BasketBallPlayType): string {
    let description = this.playDescriptionBuilder(playerActing, playerEffected, playAction);
    description += ", assisted by " + playerAssisting.firstName + " " + playerAssisting.lastName;
    return description;
  }

  playDescriptionBuilder(playerActing: Player, playerEffected: Player, playAction: BasketBallPlayType): string {
    let description = playerActing.firstName + " " + playerActing.lastName;
    description += " " + playAction + " " + playerEffected.firstName + " " + playerEffected.lastName;
    return description;
  }

  playDescriptionBuilderSolo(playerActing: Player, playAction: BasketBallPlayType): string {
    let description = playerActing.firstName + " " + playerActing.lastName;
    description += " " + playAction;
    return description;
  }

  basketballPlayBuilder(matchID: number, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: BasketBallPlayType, trade: boolean): void {
    // To be implemented
  }

  reverseBasketballAction(matchID: number, play: Play, quarterOrRound: QuarterOrRound) {
    // To be implemented
  }

  calculateStats(player: Player, matchID: Match) {
    // To be implemented
  }

}
