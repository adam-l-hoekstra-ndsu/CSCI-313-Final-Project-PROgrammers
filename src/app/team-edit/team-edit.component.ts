import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TeamService } from '../team.service';
import { Team } from '../team';

@Component({
  selector: 'app-team-edit',
  imports: [RouterLink, FormsModule],
  templateUrl: './team-edit.component.html',
  styleUrl: './team-edit.component.css'
})
export class TeamEditComponent implements OnInit {
  id = input.required<string>()
  teamService = inject(TeamService)
  team!: Team
  name!: string
  league!: string
  logo!: string

  commitChanges() {

  }

  ngOnInit(): void {
    console.log(this.id())
    // this.team = this.teamService.getTeam(this.id())
    this.teamService.getTeam(this.id()).subscribe(data => this.team = data) 
    this.name = this.team.name
    this.logo = this.team.logoUrl
    this.league = this.team.legueSubsection
  }
}
