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
  
  @Input() teamId!: string;  
  team!:Team;
  players!: Player[];
  sport!: Sport; 
  categories!:string[];
  getAverages(plr:Player ): number[] {
    return this.playerService.calculateAvg(plr, this.team)
  }

  ngOnInit(): void {
    console.log(this.teamId)
    this.teamService.getTeam(this.teamId).subscribe(data => this.team = data) 
    this.teamService.getPlayers(this.teamId).subscribe(data => this.players = data.filter(plr => plr.teams.includes(this.teamId)))
      // this.players = this.teamService.getPlayers(this.team.id).sort((a:Player, b:Player)=>a.lastName.localeCompare(b.lastName))
    
      this.sport = this.team.sport
      console.log(this.team.sport)
      if (this.sport == Sport.Basketball) {
        this.categories = this.bb.statCategories
      }

      if (this.sport == Sport.Volleyball) {
        this.categories = this.vb.statCategories
      }

      if (this.sport == Sport.Football) {
        this.categories = this.fb.statCategories
      }

      if (this.sport == Sport.RainbowSixSiege) {
        this.categories = this.rss.statCategories
      }
      
      
  }
}
