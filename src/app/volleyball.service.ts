import { inject, Injectable } from '@angular/core';
import { Team } from './team';
import { TeamService } from './team.service';
import { Sport } from './sport';
import { Player } from './player';
import { Play } from './play';
import { Match } from './match';
import { QuarterOrRound } from './quarterOrRound';

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

  constructor() {}

  onInit() {
    this.teams = this.teamData.teams.filter(
      (team) => team.sport === Sport.Volleyball
    ); // Filter teams for Volleyball
  }

    playDescriptionBuilderAssist(playerActing: Player, playerEffected: Player, playerAssisting: Player, playAction: VolleyballPlayType): string {
      let description = this.playDescriptionBuilder(playerActing, playerEffected, playAction);
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
  
    volleyballPlayBuilder(matchID: number, time: number, playerActing: Player, playerEffected: Player, playerAssisting: Player, action: VolleyballPlayType, trade: boolean): void {
      // To be implemented
    }
  
    reverseVolleyballAction(matchID: number, play: Play, quarterOrRound: QuarterOrRound) {
      // To be implemented
    }
  
    calculateStats(player: Player, matchID: Match) {
      // To be implemented
    }
}