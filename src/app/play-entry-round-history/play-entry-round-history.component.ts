import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { Match } from '../match';
import { Team } from '../team';
import { RainbowSixSiegeService, SiegePlayType } from '../rainbow-six-siege.service';
import { TeamService } from '../team.service';
import { MatchService } from '../match.service';
import { QuarterOrRound, SiegeRoundResult } from '../quarterOrRound';
import { Sport } from '../sport';

@Component({
  selector: 'app-play-entry-round-history',
  imports: [],
  templateUrl: './play-entry-round-history.component.html',
  styleUrl: './play-entry-round-history.component.css'
})
export class PlayEntryRoundHistoryComponent implements OnInit {

  @Input() matchID!: number;
  match!: Match;

  team1!: Team;
  team2!: Team;

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)

  siegeRoundResultEnum = SiegeRoundResult; // For use in the template

  ngOnInit(): void {
    this.match = this.matchService.getMatchById(Number(this.matchID));
    this.team1 = this.teamService.getTeam(this.match.team1ID);
    this.team2 = this.teamService.getTeam(this.match.team2ID);
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
    this.matchService.calculateMatchScore(this.match);
  }

  setSiegeRoundResult(result: SiegeRoundResult) {
    this.siegeService.setSiegeRoundResult( this.match.quarterOrRoundResults[this.match.quarterOrRound - 1], result);
    this.matchService.calculateMatchScore(this.match);
  }

}
