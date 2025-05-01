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
import { QuarterOrRound } from '../quarterOrRound';


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

    //Reset form values
    form.resetForm();
  }

}


