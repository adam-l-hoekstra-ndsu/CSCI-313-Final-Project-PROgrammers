import { Component, inject, OnInit } from '@angular/core';
import { RainbowSixSiegeService } from '../rainbow-six-siege.service';
import { Sport } from '../sport';
import { Player } from '../player';
import { Team } from '../team'
import { TeamService } from '../team.service';
import { Match } from '../match';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-game-statistics',
  imports: [],
  templateUrl: './game-statistics.component.html',
  styleUrl: './game-statistics.component.css'
})
export class GameStatisticsComponent implements OnInit {
  categories: string[] = [];
  sport: Sport = Sport.RainbowSixSiege; // Hardcoding sport to Rainbow Six Siege for now

  matchID: number = 3; // Hardcoding match id to 3 for now
  match!: Match;
  
  team1ID: number = 1; // Hardcoding for now
  team1!: Team;
  team2ID: number = 2; // Hardcoding for now
  team2!: Team;
  team1Players: Player[] = [];
  team2Players: Player[] = [];

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)

  ngOnInit(): void {
    this.categories = this.siegeService.statCategories;
    this.team1 = this.teamService.getTeam(this.team1ID);
    this.team2 = this.teamService.getTeam(this.team2ID);
    this.team1Players = this.teamService.getPlayers(this.team1);
    this.team2Players = this.teamService.getPlayers(this.team2);
    this.match = this.matchService.getMatchById(this.matchID);
  }


}
