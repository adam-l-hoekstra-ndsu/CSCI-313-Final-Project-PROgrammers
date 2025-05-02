import { Component, inject, input, OnInit } from '@angular/core';
import { RainbowSixSiegeService, SiegeCatagory, SiegePlayType } from '../rainbow-six-siege.service';
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
import { QuarterOrRound, SiegeRoundResult } from '../quarterOrRound';


@Component({
  selector: 'app-game-play-entry',
  imports: [SecondsToTimePipe, FormsModule, GameStatisticsComponent],
  templateUrl: './game-play-entry.component.html',
  styleUrl: './game-play-entry.component.css'
})
export class GamePlayEntryComponent {
  matchID = input.required<number>();
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
  action!: SiegePlayType;
  trade!: boolean;

  sportEnum = Sport; // For use in the template
  siegeActionEnum = SiegePlayType; // For use in the template
  siegeRoundResultEnum = SiegeRoundResult; // For use in the template

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)

  ngOnInit(): void {
    this.match = this.matchService.getMatchById(Number(this.matchID()));
    this.team1 = this.teamService.getTeam(this.match.team1ID);
    this.team2 = this.teamService.getTeam(this.match.team2ID);
  }

  setSiegeAction(action : SiegePlayType) {
    this.action = action;
  }

  onPlayDelete(play : Play, quarterOrRound: QuarterOrRound) {
    if(typeof play.playerActing == typeof SiegePlayType) {
      this.siegeService.reverseSiegeAction(Number(this.matchID()), play, quarterOrRound)
    }
  }

  onSubmit(form: NgForm) {
    this.playTime = (Number(this.playTimeMinutes * 60) + Number(this.playTimeSeconds));
    if (this.playOvertime) {this.playTime = -this.playTime;} // - denotes overtime
    if(this.team1.sport == Sport.RainbowSixSiege) {
      this.siegeService.siegePlayBuilder(this.match.id, this.playTime, this.playerActing, this.playerEffected, this.playerAssisting, this.action, this.trade);
    }

    //Set current match time
    this.match.timeRemaining = this.playTime;

    //Reset form values
    form.resetForm();
  }

  nextRound() {
    this.match.quarterOrRound++;
    if(this.match.quarterOrRound > this.match.quarterOrRoundResults.length) {
      this.match.quarterOrRoundResults.push({team1Score: 0, team2Score: 0, plays: []});
    }
  }

  previousRound() {
    if(this.match.quarterOrRound > 1) {
      this.match.quarterOrRound--;
    }
  }

  deleteQuarterOrRound() {
    if(this.match.quarterOrRoundResults.length > 1) {
      this.matchService.removeQuarterOrRoundFromMatch(this.match, this.match.quarterOrRoundResults[this.match.quarterOrRound - 1]);
      if(this.team1.sport == Sport.RainbowSixSiege) {
        for(let i = 0; i < this.match.quarterOrRoundResults[this.match.quarterOrRound - 1].plays.length; i++) {
          this.siegeService.reverseSiegeAction(this.match.id, this.match.quarterOrRoundResults[this.match.quarterOrRound - 1].plays[i], this.match.quarterOrRoundResults[this.match.quarterOrRound - 1]);
        }
      }
    }
    if(this.match.quarterOrRound > 1) {
      this.match.quarterOrRound--;
    }
  }

  setSiegeRoundResult(result: SiegeRoundResult) {
    this.siegeService.setSiegeRoundResult( this.match.quarterOrRoundResults[this.match.quarterOrRound - 1], result);
    this.matchService.calculateMatchScore(this.match);
  }

  // Known Issue: Delete Quarter or Round does not remove the stats from plays from the match.
  // Known Issue: Trade stats are irreversable.

}


