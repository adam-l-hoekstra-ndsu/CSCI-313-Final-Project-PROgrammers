import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Team } from './team'; //Team Class/Interface
import { TeamService } from './team.service'; //TeamService
import { Player } from './player'; //Player Class/Interface
import { Play } from './play'; //Play Class/Interface
import { Match } from './match'; //Match Class/Interface
import { QuarterOrRound } from './quarterOrRound'; //QuarterOrRound Class/Interface
import { Sport } from './sport';
import { MatchService } from './match.service';

export enum FootballCategory {
  YardsGained,
  Tackles,
  Fouls,
  Completions,
  PassesAttempted,
  TDs,
  FGsMade,
  FGsMissed
}

export enum FootballPlayType {
  EnteredGame = "Entered Game",
  ExitedGame = "Exited Game",
  FGMade = "Made a Field Goal",
  FGMissed = "Missed a Field Goal",
  Tackle = "Tackled",
  Penalty = "Commited a Penalty",
  Passed = "Threw a Pass to",
  Incomplete = "Threw an Incomplete Pass",
  Run = "Ran the Ball",
  Touchdown = "Scored a Touchdown",
}


@Injectable({
  providedIn: 'root'
})

export class FootballService {
  constructor() { }
  statCategories: string[] = ["YardsGained", "Tackles", "Penalties", "Completions", "PassesAttempted", "TDs", "FGs Made", "FGs Missed"]
  teams: Team[] = [];

  teamData = inject(TeamService);
  matchService = inject(MatchService)

  onInit() {
    this.teams = this.teamData.teams.filter(team => team.sport === Sport.Football); // Filter teams for Football
  }

  playDescriptionBuilderAssist(playerActing: Player, playerEffected: Player, playerAssisting: Player, playAction: FootballPlayType): string {
    let description = this.playDescriptionBuilder(playerActing, playerEffected, playAction);
    description += ", assisted by " + playerAssisting.firstName + " " + playerAssisting.lastName;
    return description;
  }

  playDescriptionBuilder(playerActing: Player, playerEffected: Player, playAction: FootballPlayType): string {
    let description = playerActing.firstName + " " + playerActing.lastName;
    description += " " + playAction + " " + playerEffected.firstName + " " + playerEffected.lastName;
    return description;
  }

  playDescriptionBuilderYardage(playerActing: Player, playerEffected: Player, playAction: FootballPlayType, yards: Number): string {
    let description = this.playDescriptionBuilder(playerActing, playerEffected, playAction)
    description += " for" + yards + " yards";
    return description;
  }

  playDescriptionBuilderSolo(playerActing: Player, playAction: FootballPlayType): string {
    let description = playerActing.firstName + " " + playerActing.lastName;
    description += " " + playAction;
    return description;
  }

  footballPlayBuilder(matchID: number, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: FootballPlayType, yards?: number): void {
    // Handle Play Description
    let playDescription = "";
    if (playerEffected != null) {
      if (yards != null) {
        this.playDescriptionBuilderYardage(playerActing, playerEffected, action, yards)
      }
      else {
        playDescription = this.playDescriptionBuilder(playerActing, playerEffected, action);
      }
    }
    else {
      playDescription = this.playDescriptionBuilderSolo(playerActing, action);
    }

    // Handle Passes
    if ((action == FootballPlayType.Passed || action == FootballPlayType.Incomplete) && yards != null) {
      playerActing.stats[matchID][FootballCategory.PassesAttempted]++;
      if (action == FootballPlayType.Passed) {
        playerActing.stats[matchID][FootballCategory.Completions]++;
        playerActing.stats[matchID][FootballCategory.YardsGained] += yards;
        playerEffected.stats[matchID][FootballCategory.YardsGained] += yards
      }
    }

    // Handle Runs
    if (action == FootballPlayType.Run && yards != null) {
      playerActing.stats[matchID][FootballCategory.YardsGained] += yards;
    }

    // Handle Touchdowns
    if (action == FootballPlayType.Touchdown) {
      playerActing.stats[matchID][FootballCategory.TDs]++;
    }

    // Handle Field Goals
    if (action == FootballPlayType.FGMade) {
      playerActing.stats[matchID][FootballCategory.FGsMade]++;
    }
    if (action == FootballPlayType.FGMissed) {
      playerActing.stats[matchID][FootballCategory.FGsMissed]++;
    }

    // Handle Game Entry / Exit
    if (action == FootballPlayType.EnteredGame) {
      playerActing.currentlyInMatch = true;
    }
    if (action == FootballPlayType.ExitedGame) {
      playerActing.currentlyInMatch = false;
    }

    // Handle Tackles
    if (action == FootballPlayType.Tackle) {
      playerActing.stats[matchID][FootballCategory.Tackles]++;
    }

    // Handle Penlty
    if (action == FootballPlayType.Penalty) {
      playerActing.stats[matchID][FootballCategory.Fouls]++;
    }

    // Create and add the play object
    let play: Play = {
      playerActing: playerActing,
      playerEffected: playerEffected,
      playerAssisting: playerAssisting,
      playAction: action,
      time: time,
      description: playDescription,
      yards: yards
    };
    this.matchService.addPlayToMatch(this.matchService.getMatchById(matchID), play);
  }

  reverseFootballAction(matchID: number, play: Play, quarterOrRound: QuarterOrRound) {

    if (play.playerActing != null) {
      if (play.yards != null) {
        // Handle Passes
        if (play.playAction == FootballPlayType.Passed || play.playAction == FootballPlayType.Incomplete) {
          play.playerActing.stats[matchID][FootballCategory.PassesAttempted]++;
          if (play.playAction == FootballPlayType.Passed) {
            play.playerActing.stats[matchID][FootballCategory.Completions]++;
            play.playerActing.stats[matchID][FootballCategory.YardsGained] -= play.yards;
            if (play.playerEffected != null) {
              play.playerEffected.stats[matchID][FootballCategory.YardsGained] -= play.yards
            }
          }
        }

        // Handle Runs
        if (play.playAction == FootballPlayType.Run) {
          play.playerActing.stats[matchID][FootballCategory.YardsGained] -= play.yards;
        }
      }
      // Handle Touchdowns
      if (play.playAction == FootballPlayType.Touchdown) {
        play.playerActing.stats[matchID][FootballCategory.TDs]--;
      }

      // Handle Field Goals
      if (play.playAction == FootballPlayType.FGMade) {
        play.playerActing.stats[matchID][FootballCategory.FGsMade]--;
      }
      if (play.playAction == FootballPlayType.FGMissed) {
        play.playerActing.stats[matchID][FootballCategory.FGsMissed]--;
      }

      // Handle Game Entry / Exit
      if (play.playAction == FootballPlayType.EnteredGame) {
        play.playerActing.currentlyInMatch = true;
      }
      if (play.playAction == FootballPlayType.ExitedGame) {
        play.playerActing.currentlyInMatch = false;
      }

      // Handle Tackles
      if (play.playAction == FootballPlayType.Tackle) {
        play.playerActing.stats[matchID][FootballCategory.Tackles]--;
      }

      // Handle Penlty
      if (play.playAction == FootballPlayType.Penalty) {
        play.playerActing.stats[matchID][FootballCategory.Fouls]--;
      }
    }
    this.matchService.removePlayFromMatch(this.matchService.getMatchById(matchID), play, quarterOrRound);
  }

}
