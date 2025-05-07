import { Injectable, inject } from '@angular/core';
import { Team } from './team';
import { Sport } from './sport';
import { TeamService } from './team.service';
import { Player } from './player';
import { Play } from './play';
import { Match } from './match';
import { QuarterOrRound } from './quarterOrRound';
import { MatchService } from './match.service';

export enum BasketballCategory {
  GP,
  MIN,
  PTS,
  FG,
  P3,
  FT,
  REB,
  AST
}

export enum BasketBallPlayType {
  EnteredGame = "Entered Game",
  ExitedGame = "Exited Game",
  FGMade = "Made a Field Goal",
  // FGMissed = "Missed a Field Goal",
  P3Made = "Made a 3 Point Field Goal",
  // P3Missed = "Missed a 3 Point Field Goal",
  FTMade = "Made a Free Throw",
  // FTMissed = "Missed a Free Throw",
  Rebound = "Got a rebound",
}

@Injectable({
  providedIn: 'root'
})

export class BasketballService {

  statCategories: string[] = ["GP", "MIN", "PTS", "FG", "3P", "FT", "REB", "AST"]
  teams: Team[] = [];

  teamData = inject(TeamService);
  matchService = inject(MatchService);

  constructor() { }

  onInit() {
    this.teams = this.teamData.teams.filter(team => team.sport === Sport.Basketball);
  }

  playDescriptionBuilderAssist(playerActing: Player, playerAssisting: Player, playAction: BasketBallPlayType): string {
    let description = this.playDescriptionBuilderSolo(playerActing, playAction);
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

  basketballPlayBuilder(match: Match, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: BasketBallPlayType): void {
    // Handle Assists and Play Description
    let playDescription = "";
    if (playerAssisting != null) {
      playDescription = this.playDescriptionBuilderAssist(playerActing, playerAssisting, action);
      playerAssisting.stats[match.id][BasketballCategory.AST]++;
    }
    else if (playerEffected != null) {
      playDescription = this.playDescriptionBuilder(playerActing, playerEffected, action);
    }
    else {
      playDescription = this.playDescriptionBuilderSolo(playerActing, action);
    }

    // Handle FGs
    if (action == BasketBallPlayType.FGMade) {
      playerActing.stats[match.id][BasketballCategory.FG]++;
      playerActing.stats[match.id][BasketballCategory.PTS] += 2;
    }

    // Handle 3pt FGs
    if (action == BasketBallPlayType.P3Made) {
      playerActing.stats[match.id][BasketballCategory.P3]++;
      playerActing.stats[match.id][BasketballCategory.PTS] += 3;
    }

    // Handle FTs
    if (action == BasketBallPlayType.FTMade) {
      playerActing.stats[match.id][BasketballCategory.FT]++;
      playerActing.stats[match.id][BasketballCategory.PTS]++;
    }

    // Handle Rebounds
    if (action == BasketBallPlayType.Rebound) {
      playerActing.stats[match.id][BasketballCategory.REB]++;
    }

    let play: Play = {
      playerActing: playerActing,
      playerEffected: playerEffected,
      playerAssisting: playerAssisting,
      playAction: action,
      time: time,
      description: playDescription,
    };
    this.matchService.addPlayToMatch(match, play);
  }

  reverseBasketballAction(match: Match, play: Play, quarterOrRound: QuarterOrRound) {
    // Handle Assists and Play Description
    if (play.playerAssisting != null) {
      play.playerAssisting.stats[match.id][BasketballCategory.AST]++;
    }

    if (play.playerActing != null) {
      // Handle FGs
      if (play.playAction == BasketBallPlayType.FGMade) {
        play.playerActing.stats[match.id][BasketballCategory.FG]++;
        play.playerActing.stats[match.id][BasketballCategory.PTS] += 2;
      }

      // Handle 3pt FGs
      if (play.playAction == BasketBallPlayType.P3Made) {
        play.playerActing.stats[match.id][BasketballCategory.P3]++;
        play.playerActing.stats[match.id][BasketballCategory.PTS] += 3;
      }

      // Handle FTs
      if (play.playAction == BasketBallPlayType.FTMade) {
        play.playerActing.stats[match.id][BasketballCategory.FT]++;
        play.playerActing.stats[match.id][BasketballCategory.PTS]++;
      }

      // Handle Rebounds
      if (play.playAction == BasketBallPlayType.Rebound) {
        play.playerActing.stats[match.id][BasketballCategory.REB]++;
      }
    }

    this.matchService.removePlayFromMatch(match, play, quarterOrRound);
  }

  calculateStats(player: Player, matchID: Match) {
    // To be implemented if need be
  }

}
