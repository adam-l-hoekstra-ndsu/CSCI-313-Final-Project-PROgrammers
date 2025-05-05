import { Component, inject, input } from '@angular/core';
import { RainbowSixSiegeService } from '../rainbow-six-siege.service';
import { Sport } from '../sport';
import { Team } from '../team'
import { TeamService } from '../team.service';
import { Match } from '../match';
import { MatchService } from '../match.service';
import { GameStatisticsComponent } from '../game-statistics/game-statistics.component';
import { SecondsToTimePipe } from '../seconds-to-time.pipe';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-view',
  imports: [GameStatisticsComponent, SecondsToTimePipe],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  categories: string[] = [];

  matchID = input.required<number>();
  match!: Match;
  
  team1!: Team;
  team2!: Team;

  sportEnum = Sport; // For use in the template

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)

  ngOnInit(): void {
    
    this.categories = this.siegeService.statCategories;
    this.match = this.matchService.getMatchById(Number(this.matchID()));
    this.team1 = this.teamService.getTeam(this.match.team1ID);
    this.team2 = this.teamService.getTeam(this.match.team2ID);
  }

}
