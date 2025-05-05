import { inject, Injectable } from '@angular/core';
import { Team } from './team';
import { TeamService } from './team.service';
import { Sport } from './sport';
import { Player } from './player';
import { Play } from './play';
import { Match } from './match';
import { QuarterOrRound } from './quarterOrRound';
import { MatchService } from './match.service';

export enum VolleyballCategory {
  Serves,
  Aces,
  Kills,
  Digs,
  Receptions,
  Assists,
  Errors,
  SoloBlocks,
  BlockAssists,
}

export enum VolleyballPlayType {
  EnteredGame = 'Entered Game',
  ExitedGame = 'Exited Game',
  Serve = "Served",
  Kill = 'Scored a Kill',
  Ace = 'Scored an Ace',
  Dig = 'Dug a Ball',
  Receptions = 'Received a Serve',
  Error = 'Made an Error',
  Blocked = 'Blocked a Ball'
}

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
  matchService = inject(MatchService);

  constructor() {}

  onInit() {
    this.teams = this.teamData.teams.filter(
      (team) => team.sport === Sport.Volleyball
    ); // Filter teams for Volleyball
  }
  
    playDescriptionBuilderAssist(playerActing: Player, playerAssisting: Player, playAction: VolleyballPlayType): string {
      let description = this.playDescriptionBuilderSolo(playerActing, playAction);
      description += ", assisted by " + playerAssisting.firstName + " " + playerAssisting.lastName;
      return description;
    }
  
    playDescriptionBuilder(playerActing: Player, playerEffected: Player, playAction: VolleyballPlayType): string {
      let description = playerActing.firstName + " " + playerActing.lastName;
      description += " " + playAction + " " + playerEffected.firstName + " " + playerEffected.lastName;
      return description;
    }
  
    playDescriptionBuilderSolo(playerActing: Player, playAction: VolleyballPlayType): string {
      let description = playerActing.firstName + " " + playerActing.lastName;
      description += " " + playAction;
      return description;
    }
  
    volleyballPlayBuilder(matchID: number, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: VolleyballPlayType): void {
      // Handle Assists and Play Description
      let playDescription = "";
      if (playerAssisting != null) {
        playDescription = this.playDescriptionBuilderAssist(playerActing, playerAssisting, action);
        if(action != VolleyballPlayType.Blocked) {
          playerAssisting.stats[matchID][VolleyballCategory.Assists]++;
        }
      }
      else if (playerEffected != null) {
        playDescription = this.playDescriptionBuilder(playerActing, playerEffected, action);

      }
      else {
        playDescription = this.playDescriptionBuilderSolo(playerActing, action);
      }

      // Handle Serves
      if(action == VolleyballPlayType.Serve) {
        playerActing.stats[matchID][VolleyballCategory.Serves]++;
      }

      // Handle Kills
      if(action == VolleyballPlayType.Kill) {
        playerActing.stats[matchID][VolleyballCategory.Kills]++;
      }

      // Handle Aces
      if(action == VolleyballPlayType.Ace) {
        playerActing.stats[matchID][VolleyballCategory.Aces]++;
      }

      // Handle Digs
      if(action == VolleyballPlayType.Dig) {
        playerActing.stats[matchID][VolleyballCategory.Digs]++;
      }

      // Handle Receptions
      if(action == VolleyballPlayType.Receptions) {
        playerActing.stats[matchID][VolleyballCategory.Receptions]++;
      }

      // Handle Errors
      if(action == VolleyballPlayType.Error) {
        playerActing.stats[matchID][VolleyballCategory.Errors]++;
      }

      // Handle Blocks
      if(action == VolleyballPlayType.Blocked) {
        if(playerAssisting != null) {
          playerActing.stats[matchID][VolleyballCategory.BlockAssists]++;
          playerAssisting.stats[matchID][VolleyballCategory.BlockAssists]++;
        }
        else {
          playerActing.stats[matchID][VolleyballCategory.SoloBlocks]++;
        }
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
      this.matchService.addPlayToMatch(this.matchService.getMatchById(matchID), play);
    }
  
    reverseVolleyballAction(matchID: number, play: Play, quarterOrRound: QuarterOrRound) {
      // Handle Assists and Play Description
      if (play.playerAssisting != null && play.playAction != VolleyballPlayType.Blocked) {
        play.playerAssisting.stats[matchID][VolleyballCategory.Assists]--;
      }

      if(play.playerActing != null) {
        // Handle Serves
      if(play.playAction == VolleyballPlayType.Serve) {
        play.playerActing.stats[matchID][VolleyballCategory.Serves]--;
      }

      // Handle Kills
      if(play.playAction == VolleyballPlayType.Kill) {
        play.playerActing.stats[matchID][VolleyballCategory.Kills]++;
      }

      // Handle Aces
      if(play.playAction == VolleyballPlayType.Ace) {
        play.playerActing.stats[matchID][VolleyballCategory.Aces]++;
      }

      // Handle Digs
      if(play.playAction == VolleyballPlayType.Dig) {
        play.playerActing.stats[matchID][VolleyballCategory.Digs]++;
      }

      // Handle Receptions
      if(play.playAction == VolleyballPlayType.Receptions) {
        play.playerActing.stats[matchID][VolleyballCategory.Receptions]++;
      }

      // Handle Errors
      if(play.playAction == VolleyballPlayType.Error) {
        play.playerActing.stats[matchID][VolleyballCategory.Errors]++;
      }

      // Handle Blocks
      if(play.playAction == VolleyballPlayType.Blocked) {
        if(play.playerAssisting != null) {
          play.playerActing.stats[matchID][VolleyballCategory.BlockAssists]++;
          play.playerAssisting.stats[matchID][VolleyballCategory.BlockAssists]++;
        }
        else {
          play.playerActing.stats[matchID][VolleyballCategory.SoloBlocks]++;
        }
      }
      }

      // Remove Play
      this.matchService.removePlayFromMatch(this.matchService.getMatchById(matchID), play, quarterOrRound);
    }
  
    calculateStats(player: Player, matchID: Match) {
      // To be implemented if need be
    }
}
