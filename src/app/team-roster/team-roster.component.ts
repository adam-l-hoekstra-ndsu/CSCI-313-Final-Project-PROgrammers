import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Team } from '../team';
import { Player } from '../player';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-roster',
  imports: [],
  templateUrl: './team-roster.component.html',
  styleUrl: './team-roster.component.css'
})
export class TeamRosterComponent implements OnInit {
  teamService = inject(TeamService)
  @Input() team!: Team;  
  players!: Player[];

  ngOnInit(): void {
      this.players = this.teamService.getPlayers(this.team)
      console.log(this.players.toString())
  }
}
