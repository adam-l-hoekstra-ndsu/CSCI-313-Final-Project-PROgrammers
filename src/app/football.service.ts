import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Team } from './team'; //Team Class/Interface
import { TeamService } from './team.service'; //TeamService
import { Player } from './player'; //Player Class/Interface
import { Play } from './play'; //Play Class/Interface
import { Match } from './match'; //Match Class/Interface
import { QuarterOrRound } from './quarterOrRound'; //QuarterOrRound Class/Interface

export enum FootballCategory {
  GamesPlayed,
  YardsGained,
  Tackles,
  Fouls,
  Completions,
  PassesAttempted,
  TDs,
  FGs
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
  statCategories: string[] = ["GamesPlayed", "YardsGained", "Tackles", "Penalties", "Completions", "PassesAttempted", "TDs", "FGs"]
  teams: Team[] = [];

  teamData = inject(TeamService);

  onInit() {
    this.teams = this.teamData.teams.filter(team => team.sport === 2); // Filter teams for Rainbow Six Siege
  }

  playDescriptionBuilderAssist(playerActing: Player, playerEffected: Player, playerAssisting: Player, playAction: FootballPlayType): string {
      let description = this.playDescriptionBuilder(playerActing, playerEffected, playAction);
      description += ", assisted by " + playerAssisting.firstName + " " + playerAssisting.lastName;
      return description;
    }
  
    playDescriptionBuilder(playerActing: Player, playerEffected: Player, playAction: FootballPlayType): string {
      let description = playerActing.firstName + " " + playerActing.lastName;
      description +=  " " + playAction + " " + playerEffected.firstName + " " + playerEffected.lastName;
      return description;
    }
  
    playDescriptionBuilderSolo(playerActing: Player, playAction: FootballPlayType): string {
      let description = playerActing.firstName + " " + playerActing.lastName;
      description +=  " " + playAction;
      return description;
    }

    footballPlayBuilder(matchID: number, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: FootballPlayType, trade: boolean): void {
      // To be implemented
    }

    reverseFootballAction(matchID: number, play: Play, quarterOrRound: QuarterOrRound) {
      // To be implemented
    }

    calculateStats(player: Player, matchID: Match) {
      // To be implemented
    }
}
