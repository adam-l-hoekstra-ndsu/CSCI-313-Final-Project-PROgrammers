import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { RainbowSixSiegeService, SiegePlayType } from '../rainbow-six-siege.service';
import { Sport } from '../sport';
import { Player } from '../player';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { Match } from '../match';
import { MatchService } from '../match.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SiegeRoundResult } from '../quarterOrRound';
import { FootballPlayType, FootballService } from '../football.service';
import { VolleyballPlayType, VolleyballService } from '../volleyball.service';
import { BasketBallPlayType, BasketballService } from '../basketball.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-play-entry-form',
  imports: [FormsModule],
  templateUrl: './play-entry-form.component.html',
  styleUrl: './play-entry-form.component.css'
})
export class PlayEntryFormComponent implements OnInit {

  @Input() matchID!: string;
  match!: Match;
  sport!: Sport;
  sportEnum = Sport;  // For use in the template

  team1!: Team;
  team2!: Team;

  team1Players!: Player[]
  team2Players!: Player[]

  siegeService = inject(RainbowSixSiegeService);
  footballService = inject(FootballService);
  volleyballService = inject(VolleyballService);
  basketballService = inject(BasketballService)
  teamService = inject(TeamService);
  matchService = inject(MatchService)
  playerService = inject(PlayerService)

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

  footballAction!: FootballPlayType;
  footballActionEnum = FootballPlayType; // For use in the template
  yards?: number

  volleyballAction!: VolleyballPlayType
  volleyballActionEnum = VolleyballPlayType // For use in the template

  basketballAction!: BasketBallPlayType
  basketballlActionEnum = BasketBallPlayType // For use in the template

  ngOnInit(): void {
    this.matchService.getMatchById(this.matchID).subscribe(data => {
      this.match = data
      this.teamService.getTeam(this.match.team1ID).subscribe(data => {
        this.team1 = data
        this.sport = this.team1.sport;
        this.playerService.getPlayers().subscribe(data => this.team1Players = data.filter(plr => plr.teams.includes(this.team1.id)))
      });
      this.teamService.getTeam(this.match.team2ID).subscribe(data => {
        this.team2 = data
        this.playerService.getPlayers().subscribe(data => this.team2Players = data.filter(plr => plr.teams.includes(this.team2.id)))
      });
    });
    
  }

  onSubmit(form: NgForm) {
    this.playTime = (Number(this.playTimeMinutes * 60) + Number(this.playTimeSeconds));
    if (this.playOvertime) this.playTime = -this.playTime;
    if(this.sport == Sport.RainbowSixSiege) {
      this.siegeService.siegePlayBuilder(this.match, this.playTime, this.playerActing, this.playerEffected, this.playerAssisting, this.siegeAction, this.trade);
    }
    if(this.sport == Sport.Football) {
      this.footballService.footballPlayBuilder(this.match, this.playTime, this.playerActing, this.playerEffected, this.playerAssisting, this.footballAction, this.yards);
    }
    if(this.sport == Sport.Volleyball) {
      this.volleyballService.volleyballPlayBuilder(this.match, this.playTime, this.playerActing, this.playerEffected, this.playerAssisting, this.volleyballAction);
    }
    if(this.sport == Sport.Basketball) {
      this.basketballService.basketballPlayBuilder(this.match, this.playTime, this.playerActing, this.playerEffected, this.playerAssisting, this.basketballAction);
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

  setFootballAction(action : FootballPlayType) {
    this.footballAction = action;
  }

  setVolleyballAction(action : VolleyballPlayType) {
    this.volleyballAction = action;
  }

  setBasketballAction(action : BasketBallPlayType) {
    this.basketballAction = action;
  }
}
