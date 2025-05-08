 import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { Sport } from '../sport';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-team-edit',
  imports: [RouterLink, FormsModule],
  templateUrl: './team-edit.component.html',
  styleUrl: './team-edit.component.css'
})
export class TeamEditComponent implements OnInit {
  id = input.required<string>()
  teamService = inject(TeamService)
  authService = inject(AuthService);
  team!: Team
  name!: string
  league!: string
  logo!: string
  sport!: Sport

  commitChanges() {
    console.log("errors to focus on below")
    this.teamService.editTeam(this.team, this.name, this.league, this.logo)
  }

  ngOnInit(): void {
    console.log(this.id())
    // this.team = this.teamService.getTeam(this.id())
    this.teamService.getTeam(this.id()).subscribe(data => this.team = data) 
    this.teamService.getTeam(this.id()).subscribe(data => this.name = data.name) 
    this.teamService.getTeam(this.id()).subscribe(data => this.league = data.leagueSubsection) 
    this.teamService.getTeam(this.id()).subscribe(data => this.logo = data.logoUrl) 
    this.teamService.getTeam(this.id()).subscribe(data => this.sport = data.sport) 
    
    // this.name = this.team.name
    // this.logo = this.team.logoUrl
    // this.league = this.team.legueSubsection
  }
}