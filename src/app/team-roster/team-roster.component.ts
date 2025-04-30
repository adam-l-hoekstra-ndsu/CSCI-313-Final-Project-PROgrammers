import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Team } from '../team';
import { Player } from '../player';
import { TeamService } from '../team.service';
import { Sport } from '../sport';
import { BasketballService } from '../basketball.service';
import { FootballService } from '../football.service';
import { VolleyballService } from '../volleyball.service';
import { RainbowSixSiegeService } from '../rainbow-six-siege.service';
import { PlayerService } from '../player.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-roster',
  imports: [RouterLink],
  templateUrl: './team-roster.component.html',
  styleUrl: './team-roster.component.css'
})
export class TeamRosterComponent implements OnInit {
  teamService = inject(TeamService)
  playerService = inject(PlayerService)
  bb = inject(BasketballService)
  fb = inject(FootballService)
  vb = inject(VolleyballService)
  rss = inject(RainbowSixSiegeService)
  @Input() team!: Team;  
  players!: Player[];
  sport!: Sport; 
  categories!:string[];
  getAverages(plr:Player): number[] {
    return this.playerService.calculateAvg(plr)
  }
  ngOnInit(): void {
      this.players = this.teamService.getPlayers(this.team)
      this.sport = this.team.sport
      if (this.sport = Sport.Basketball) {
        this.categories = this.bb.statCategories
      }
      else if (this.sport = Sport.Football) {
        this.categories = this.fb.statCategories
      }
      else if (this.sport = Sport.Volleyball) {
        this.categories = this.vb.statCategories
      }
      else if (this.sport = Sport.RainbowSixSiege) {
        this.categories = this.rss.statCategories
      }
  }
}
