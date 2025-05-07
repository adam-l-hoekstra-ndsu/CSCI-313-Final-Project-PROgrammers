import { Injectable, inject } from '@angular/core';
import { Team } from './team';
// import { teams } from './team-data';
import { TeamService } from './team.service'
import { MatchService } from './match.service';
import { Sport } from './sport';
import { Player } from './player';
import { Play } from './play';
import { QuarterOrRound, SiegeRoundResult } from './quarterOrRound';
import { Match } from './match';

export enum SiegeCatagory {
  Kills,
  Deaths,
  Assists,
  ObjectivePlays,
  RoundsSurvived,
  Trades,
  Revives,
  Clutches,
  KDRatio,
  HSRatio,
  HS,
}

export enum SiegePlayType {
  Killed = "Killed",
  Headshot = "Headshot",
  Revived = "Revived",
  Planted = "Planted/Disabled the Defuser",
  Clutch = "Clutched"
}


@Injectable({
  providedIn: 'root'
})

export class RainbowSixSiegeService {
  statCategories: string[] = ["Kills", "Deaths", "Assists", "Objective Plays", "Rounds Survied", "Trades", "Revives", "Clutches", "K/D", "HS%"]
  teams: Team[] = [];

  teamService = inject(TeamService);
  matchService = inject(MatchService);

  constructor() { }

  onInit() {
    this.teamService.getTeams().subscribe(data => this.teams = data.filter(team => team.sport === Sport.RainbowSixSiege)); // Filter teams for Rainbow Six Siege
  }

  playDescriptionBuilderAssist(playerActing: Player, playerEffected: Player, playerAssisting: Player, playAction: SiegePlayType): string {
    let description = this.playDescriptionBuilder(playerActing, playerEffected, playAction);
    description += ", assisted by " + playerAssisting.firstName + " " + playerAssisting.lastName;
    return description;
  }

  playDescriptionBuilder(playerActing: Player, playerEffected: Player, playAction: SiegePlayType): string {
    let description = playerActing.firstName + " " + playerActing.lastName;
    description += " " + playAction + " " + playerEffected.firstName + " " + playerEffected.lastName;
    return description;
  }

  playDescriptionBuilderSolo(playerActing: Player, playAction: SiegePlayType): string {
    let description = playerActing.firstName + " " + playerActing.lastName;
    description += " " + playAction;
    return description;
  }

  siegePlayBuilder(match: Match, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: SiegePlayType, trade: boolean): void {
    // Handle Assists and Play Description
    let playDescription = "";
    if (playerAssisting != null) {
      playDescription = this.playDescriptionBuilderAssist(playerActing, playerEffected, playerAssisting, action);
      playerAssisting.stats[match.id][SiegeCatagory.Assists]++;
    }
    else if (playerEffected != null) {
      playDescription = this.playDescriptionBuilder(playerActing, playerEffected, action);

    }
    else {
      playDescription = this.playDescriptionBuilderSolo(playerActing, action);
    }

    // Handle Kills & Trades
    if (action == SiegePlayType.Killed || action == SiegePlayType.Headshot) {
      playerActing.stats[match.id][SiegeCatagory.Kills]++;
      playerEffected.stats[match.id][SiegeCatagory.Deaths]++;
      // playerEffected.currentlyInMatch = false;
      if (trade) {
        playerActing.stats[match.id][SiegeCatagory.Trades]++;
      }
      if (action == SiegePlayType.Headshot) {
        playerActing.stats[match.id][SiegeCatagory.HS]++;
      }
    }

    // Handle Revives
    if (action == SiegePlayType.Revived) {
      playerActing.stats[match.id][SiegeCatagory.Revives]++;
    }

    // Handle Objective Plays
    if (action == SiegePlayType.Planted) {
      playerActing.stats[match.id][SiegeCatagory.ObjectivePlays]++;
    }

    // Handle Clutches
    if (action == SiegePlayType.Clutch) {
      playerActing.stats[match.id][SiegeCatagory.Clutches]++;
    }


    // Create and add the play object
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

  reverseSiegeAction(match: Match, play: Play, quarterOrRound: QuarterOrRound) {
    // Handle Assists
    if (play.playerAssisting != null) {
      play.playerAssisting.stats[match.id][SiegeCatagory.Assists]--;
    }

    // Handle Kills, Headshots & Trades
    if (play.playerActing != null) {

      if (play.playerEffected != null) {
        if (play.playAction == SiegePlayType.Killed || play.playAction == SiegePlayType.Headshot) {
          play.playerActing.stats[match.id][SiegeCatagory.Kills]--;
          play.playerEffected.stats[match.id][SiegeCatagory.Deaths]--;
          // play.playerEffected.currentlyInMatch = true;
        }
        if (play.playAction == SiegePlayType.Headshot) {
          play.playerActing.stats[match.id][SiegeCatagory.HS]--;
        }

        // Handle Revives
        if (play.playAction == SiegePlayType.Revived) {
          play.playerActing.stats[match.id][SiegeCatagory.Revives]--;
        }
      }

      // Handle Clutches
      if (play.playAction == SiegePlayType.Clutch) {
        play.playerActing.stats[match.id][SiegeCatagory.Clutches]--;
      }

      // Handle Objective Plays
      if (play.playAction == SiegePlayType.Planted) {
        play.playerActing.stats[match.id][SiegeCatagory.ObjectivePlays]--;
      }

    }

    this.matchService.removePlayFromMatch(match, play, quarterOrRound);
  }

  setSiegeRoundResult(quarterOrRound: QuarterOrRound, result: SiegeRoundResult) {
    quarterOrRound.result = result;

    // Update the scores based on the result
    if (result == SiegeRoundResult.TEAM1_OBJ || result == SiegeRoundResult.TEAM1_KILL || result == SiegeRoundResult.TEAM1_TIME) {
      quarterOrRound.team1Score = 1;
      quarterOrRound.team2Score = 0;
    }
    else if (result == SiegeRoundResult.TEAM2_OBJ || result == SiegeRoundResult.TEAM2_KILL || result == SiegeRoundResult.TEAM2_TIME) {
      quarterOrRound.team1Score = 0;
      quarterOrRound.team2Score = 1;
    }

  }

  calculateStats(player: Player, match: Match) {
    // Rounds Survived
    let playerDeaths = player.stats[match.id][SiegeCatagory.Deaths];
    player.stats[match.id][SiegeCatagory.RoundsSurvived] = match.quarterOrRoundResults.length - playerDeaths;

    // K/D Ratio
    if (player.stats[match.id][SiegeCatagory.Deaths] == 0) {
      player.stats[match.id][SiegeCatagory.KDRatio] = player.stats[match.id][SiegeCatagory.Kills];
    }
    else {
      player.stats[match.id][SiegeCatagory.KDRatio] = Number(Number(player.stats[match.id][SiegeCatagory.Kills]) / Number(player.stats[match.id][SiegeCatagory.Deaths]));
    }

    // HS%
    if (player.stats[match.id][SiegeCatagory.HS] == 0) {
      player.stats[match.id][SiegeCatagory.HSRatio] = 0;
    }
    else {
      player.stats[match.id][SiegeCatagory.HSRatio] = (player.stats[match.id][SiegeCatagory.HS] / player.stats[match.id][SiegeCatagory.Kills]) * 100;
    }
  };

}
