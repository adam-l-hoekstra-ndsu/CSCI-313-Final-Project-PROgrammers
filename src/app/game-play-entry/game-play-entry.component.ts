import { Component, inject, OnInit } from '@angular/core';
import { RainbowSixSiegeService, SiegeCatagory } from '../rainbow-six-siege.service';
import { Sport } from '../sport';
import { Player } from '../player';
import { Team } from '../team'
import { Play } from '../play';
import { TeamService } from '../team.service';
import { Match } from '../match';
import { MatchService } from '../match.service';
import { GameStatisticsComponent } from '../game-statistics/game-statistics.component';
import { SecondsToTimePipe } from '../seconds-to-time.pipe';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-game-play-entry',
  imports: [SecondsToTimePipe, FormsModule, GameStatisticsComponent],
  templateUrl: './game-play-entry.component.html',
  styleUrl: './game-play-entry.component.css'
})
export class GamePlayEntryComponent {
  matchID: number = 3; // Hardcoding match id for now
  match!: Match;
  
  team1!: Team;
  team2!: Team;

  playerActing!: Player;
  playerEffected!: Player;
  playerAssisting!: Player;
  playTimeMinutes!: number;
  playTimeSeconds!: number;
  playTime!: number;
  playOvertime!: boolean;
  playDescription!: string;
  action!: string;

  sportEnum = Sport; // For use in the template

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)

  ngOnInit(): void {
    this.match = this.matchService.getMatchById(this.matchID);
    this.team1 = this.teamService.getTeam(this.match.team1ID);
    this.team2 = this.teamService.getTeam(this.match.team2ID);
  }

  setAction(action : string) {
    this.action = action;
  }

  playDescriptionBuilderAssist(playerActing: Player, playerEffected: Player, playerAssisting: Player, playAction: string): string {
    let description = this.playDescriptionBuilder(playerActing, playerEffected, playAction);
    description += ", assisted by " + playerAssisting.firstName + " " + playerAssisting.lastName;
    return description;
  }

  playDescriptionBuilder(playerActing: Player, playerEffected: Player, playAction: string): string {
    let description = playerActing.firstName + " " + playerActing.lastName;
    description +=  " " + playAction + " " + playerEffected.firstName + " " + playerEffected.lastName;
    return description;
  }

  onSubmit(form: NgForm) {
    this.playTime = (Number(this.playTimeMinutes * 60) + Number(this.playTimeSeconds));
    if (this.playOvertime) {this.playTime = -this.playTime;} // - denotes overtime

    // Handle Assists and Play Description
    if(this.playerAssisting != null) {
      this.playDescription = this.playDescriptionBuilderAssist(this.playerActing, this.playerEffected, this.playerAssisting, this.action);
      this.playerAssisting.stats[this.matchID][SiegeCatagory.Assists]++;
    }
    else {
      this.playDescription = this.playDescriptionBuilder(this.playerActing, this.playerEffected, this.action);
    }

    // Handle Kills
    if(this.action == 'Killed') {
      this.playerActing.stats[this.matchID][SiegeCatagory.Kills]++;
      this.playerEffected.stats[this.matchID][SiegeCatagory.Deaths]++;
    }

    // Handle Revives
    if(this.action == 'Revived') {
      this.playerActing.stats[this.matchID][SiegeCatagory.Revives]++;
    }

    // Handle Objective Plays
    if(this.action == 'Planted/Disabled the Defuser') {
      this.playerActing.stats[this.matchID][SiegeCatagory.ObjectivePlays]++;
    }

    // Create and add the play object
    let play: Play = {
      time: this.playTime,
      description: this.playDescription,
    };
    this.matchService.addPlayToMatch(this.match, play);
  }

}


