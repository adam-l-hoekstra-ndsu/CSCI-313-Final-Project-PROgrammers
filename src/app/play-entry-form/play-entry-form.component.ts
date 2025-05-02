import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { RainbowSixSiegeService, SiegePlayType } from '../rainbow-six-siege.service';
import { Sport } from '../sport';
import { Player } from '../player';
import { Team } from '../team';
import { Play } from '../play';
import { TeamService } from '../team.service';
import { Match } from '../match';
import { MatchService } from '../match.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SiegeRoundResult } from '../quarterOrRound';

@Component({
  selector: 'app-play-entry-form',
  imports: [FormsModule],
  templateUrl: './play-entry-form.component.html',
  styleUrl: './play-entry-form.component.css'
})
export class PlayEntryFormComponent implements OnInit {

  @Input() matchID!: number;
  match!: Match;

  team1!: Team;
  team2!: Team;

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)

  playerActing!: Player;
  playerEffected!: Player;
  playerAssisting!: Player;
  playTimeMinutes: number = 0;
  playTimeSeconds: number = 0;
  playTime!: number;
  playOvertime!: boolean;
  playDescription!: string;

  siegeAction!: SiegePlayType;
  siegeActionEnum = SiegePlayType; // For use in the template
  siegeRoundResultEnum = SiegeRoundResult; // For use in the template
  trade!: boolean;

  ngOnInit(): void {
    this.match = this.matchService.getMatchById(Number(this.matchID));
    this.team1 = this.teamService.getTeam(this.match.team1ID);
    this.team2 = this.teamService.getTeam(this.match.team2ID);
  }

  onSubmit(form: NgForm) {
    this.playTime = (Number(this.playTimeMinutes * 60) + Number(this.playTimeSeconds));
    if (this.playOvertime) this.playTime = -this.playTime;
    if(this.team1.sport == Sport.RainbowSixSiege) {
      this.siegeService.siegePlayBuilder(this.match.id, this.playTime, this.playerActing, this.playerEffected, this.playerAssisting, this.siegeAction, this.trade);
    }

    this.siegeService.calculateStats(this.playerActing, this.match);

    //Set current match time
    this.match.timeRemaining = this.playTime;

    //Reset form values
    form.resetForm();
    form.controls['playTimeMinutes'].setValue(0);
    form.controls['playTimeSeconds'].setValue(0);
  }

  setSiegeAction(action : SiegePlayType) {
    this.siegeAction = action;
  }
}
