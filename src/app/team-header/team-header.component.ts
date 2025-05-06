import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { Sport } from '../sport';

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
  getSport(t:Team) {
    if (t.sport == Sport.Basketball) {
            return "Basketball"
    }
    if (t.sport == Sport.Volleyball) {
      return "Volleyball"
    }
    if (t.sport == Sport.Football) {
      return "Football"
    }
    if (t.sport == Sport.RainbowSixSiege) {
      return "Rainbow Six Siege"
    }
    return "Not Found"
  }
  ngOnInit(): void {
    // this.team = this.teamService.getTeam(this.teamId)
    this.teamService.getTeam(this.teamId).subscribe(data => this.team = data) 
  }
}