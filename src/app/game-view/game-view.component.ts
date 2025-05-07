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
import { Firestore } from '@angular/fire/firestore';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-game-view',
  imports: [GameStatisticsComponent, SecondsToTimePipe, RouterLink],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  categories: string[] = [];

  matchID = input.required<string>();
  match!: Match;
  
  team1!: Team;
  team2!: Team;

    team1Players!: Player[]
    team2Players!: Player[]

  sportEnum = Sport; // For use in the template

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)
  firestore = inject(Firestore);
  playerService = inject(PlayerService)

  ngOnInit(): void {
    this.categories = this.siegeService.statCategories;
    this.matchService.getMatchById(this.matchID()).subscribe(data => {
       this.match = data;
       console.log(this.match);
       this.teamService.getTeam(this.match.team1ID).subscribe(data => {
       this.team1 = data
       this.playerService.getPlayers().subscribe(data => {
        this.team1Players = data.filter(plr => plr.teams.includes(this.team1.id))
       });
      });
       this.teamService.getTeam(this.match.team2ID).subscribe(data => {
        this.team2 = data
        this.playerService.getPlayers().subscribe(data => this.team2Players = data.filter(plr => plr.teams.includes(this.team2.id)))
      });
      });
    
  }

}
