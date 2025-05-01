import { Component, inject, OnInit, Input } from '@angular/core';
import { RainbowSixSiegeService } from '../rainbow-six-siege.service';
import { FootballService } from '../football.service';
import { VolleyballService } from '../volleyball.service';
import { BasketballService } from '../basketball.service';
import { Team } from '../team'
import { TeamService } from '../team.service';
import { Match } from '../match';
import { MatchService } from '../match.service';
import { Sport } from '../sport';

@Component({
  selector: 'app-game-statistics',
  imports: [],
  templateUrl: './game-statistics.component.html',
  styleUrl: './game-statistics.component.css'
})
export class GameStatisticsComponent implements OnInit {
  categories: string[] = [];

  @Input() matchID!: number;
  match!: Match;
  
  team1!: Team;
  team2!: Team;

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  footballService = inject(FootballService);
  volleyballService = inject(VolleyballService);
  basketballService = inject(BasketballService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)

  ngOnInit(): void {
    this.match = this.matchService.getMatchById(Number(this.matchID));
    this.team1 = this.teamService.getTeam(this.match.team1ID);
    this.team2 = this.teamService.getTeam(this.match.team2ID);
    this.setCategories(this.team1.sport);
  }

  setCategories(sport: Sport) {
    switch (sport) {
      case Sport.RainbowSixSiege:
        this.categories = this.siegeService.statCategories;
        break;
      case Sport.Football:
        this.categories = this.footballService.statCategories;
        break;
      // case Sport.Volleyball:
      //   this.categories = this.volleyballService.statCategories;
      //   break;
      case Sport.Basketball:
        this.categories = this.basketballService.statCategories;
        break;
      default:
        this.categories = [];
    }
  }


}
