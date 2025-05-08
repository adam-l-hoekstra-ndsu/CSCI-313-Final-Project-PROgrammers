import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Team } from './team'; //Team Class/Interface
import { TeamService } from './team.service'; //TeamService
import { Player } from './player'; //Player Class/Interface
// import { players } from './player-data'; //Player Data/Database
import { PlayerService } from './player.service'; //PlayerService
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
  statCategories: string[] = ["Yards Gained", "Tackles", "Penalties", "Completions", "Passes Attempted", "TDs", "FGs Made", "FGs Missed"]
  teams: Team[] = [];

  teamData = inject(TeamService);
  matchService = inject(MatchService)
  playerService = inject(PlayerService)

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

  footballPlayBuilder(match: Match, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: FootballPlayType, yards?: number): void {
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
      playerActing.stats[match.id][FootballCategory.PassesAttempted]++;
      if (action == FootballPlayType.Passed) {
        playerActing.stats[match.id][FootballCategory.Completions]++;
        playerActing.stats[match.id][FootballCategory.YardsGained] += yards;
        playerEffected.stats[match.id][FootballCategory.YardsGained] += yards
      }
    }

    // Handle Runs
    if (action == FootballPlayType.Run && yards != null) {
      playerActing.stats[match.id][FootballCategory.YardsGained] += yards;
    }

    // Handle Touchdowns
    if (action == FootballPlayType.Touchdown) {
      playerActing.stats[match.id][FootballCategory.TDs]++;
    }

    // Handle Field Goals
    if (action == FootballPlayType.FGMade) {
      playerActing.stats[match.id][FootballCategory.FGsMade]++;
    }
    if (action == FootballPlayType.FGMissed) {
      playerActing.stats[match.id][FootballCategory.FGsMissed]++;
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
      playerActing.stats[match.id][FootballCategory.Tackles]++;
    }

    // Handle Penlty
    if (action == FootballPlayType.Penalty) {
      playerActing.stats[match.id][FootballCategory.Fouls]++;
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
    this.matchService.addPlayToMatch(match, play);
    this.playerService.updatePlayer(playerActing.id, playerActing);
    this.playerService.updatePlayer(playerEffected.id, playerEffected);
    if (playerAssisting != null) {
      this.playerService.updatePlayer(playerAssisting.id, playerAssisting);
    }
  }

  reverseFootballAction(match: Match, play: Play, quarterOrRound: QuarterOrRound) {

    if (play.playerActing != null) {
      if (play.yards != null) {
        // Handle Passes
        if (play.playAction == FootballPlayType.Passed || play.playAction == FootballPlayType.Incomplete) {
          play.playerActing.stats[match.id][FootballCategory.PassesAttempted]++;
          if (play.playAction == FootballPlayType.Passed) {
            play.playerActing.stats[match.id][FootballCategory.Completions]++;
            play.playerActing.stats[match.id][FootballCategory.YardsGained] -= play.yards;
            if (play.playerEffected != null) {
              play.playerEffected.stats[match.id][FootballCategory.YardsGained] -= play.yards
            }
          }
        }

        // Handle Runs
        if (play.playAction == FootballPlayType.Run) {
          play.playerActing.stats[match.id][FootballCategory.YardsGained] -= play.yards;
        }
      }
      // Handle Touchdowns
      if (play.playAction == FootballPlayType.Touchdown) {
        play.playerActing.stats[match.id][FootballCategory.TDs]--;
      }

      // Handle Field Goals
      if (play.playAction == FootballPlayType.FGMade) {
        play.playerActing.stats[match.id][FootballCategory.FGsMade]--;
      }
      if (play.playAction == FootballPlayType.FGMissed) {
        play.playerActing.stats[match.id][FootballCategory.FGsMissed]--;
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
        play.playerActing.stats[match.id][FootballCategory.Tackles]--;
      }

      // Handle Penlty
      if (play.playAction == FootballPlayType.Penalty) {
        play.playerActing.stats[match.id][FootballCategory.Fouls]--;
      }
    }
    this.matchService.removePlayFromMatch(match, play, quarterOrRound);
    if(play.playerActing != null) this.playerService.updatePlayer(play.playerActing.id, play.playerActing);
    if(play.playerEffected != null) this.playerService.updatePlayer(play.playerEffected.id, play.playerEffected);
    if (play.playerAssisting != null) {
      this.playerService.updatePlayer(play.playerAssisting.id, play.playerAssisting);
    }
  }

}
