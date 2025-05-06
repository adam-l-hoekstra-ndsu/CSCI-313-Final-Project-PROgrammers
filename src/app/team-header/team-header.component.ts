import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-header',
  imports: [RouterLink],
  templateUrl: './team-header.component.html',
  styleUrl: './team-header.component.css'
})
export class TeamHeaderComponent implements OnInit{
  @Input() teamId!: string;
  teamService = inject(TeamService)
  team !: Team;
  ngOnInit(): void {
    // this.team = this.teamService.getTeam(this.teamId)
    this.teamService.getTeam(this.teamId).subscribe(data => this.team = data) 
  }
}
