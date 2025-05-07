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
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-game-statistics',
  imports: [],
  templateUrl: './game-statistics.component.html',
  styleUrl: './game-statistics.component.css'
})
export class GameStatisticsComponent implements OnInit {
  categories: string[] = [];

  @Input() matchID!: string;
  match!: Match;
  
  team1!: Team;
  team2!: Team;

  team1Players!: Player[]
  team2Players!: Player[]

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  footballService = inject(FootballService);
  volleyballService = inject(VolleyballService);
  basketballService = inject(BasketballService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)
  playerService = inject(PlayerService)

  ngOnInit(): void {
    this.matchService.getMatchById(this.matchID).subscribe(data => {
      this.match = data
      this.teamService.getTeam(this.match.team1ID).subscribe(data => {
        this.team1 = data;
        this.setCategories(this.team1.sport);
      });
      this.teamService.getTeam(this.match.team2ID).subscribe(data => this.team2 = data);
      this.playerService.getPlayers().subscribe(data => this.team1Players = data.filter(plr => plr.teams.includes(this.team1.id)))
      this.playerService.getPlayers().subscribe(data => this.team2Players = data.filter(plr => plr.teams.includes(this.team2.id)))
    });
  }

  setCategories(sport: Sport) {
    switch (sport) {
      case Sport.RainbowSixSiege:
        this.categories = this.siegeService.statCategories;
        break;
      case Sport.Football:
        this.categories = this.footballService.statCategories;
        break;
      case Sport.Volleyball:
        this.categories = this.volleyballService.statCategories;
        break;
      case Sport.Basketball:
        this.categories = this.basketballService.statCategories;
        break;
      default:
        this.categories = [];
    }
  }


}
