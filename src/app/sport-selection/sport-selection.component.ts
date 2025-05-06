import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportsService, SportInfo } from '../sports.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-sport-selection',
  imports: [CommonModule, RouterLink],
  templateUrl: './sport-selection.component.html',
  styleUrl: './sport-selection.component.css',
})

export class SportSelectionComponent implements OnInit {
  sports: SportInfo[] = [];
  userService = inject(UserService);
  sportService = inject(SportsService);
  teamService = inject(TeamService)

  teams: Team[] = [];

  ngOnInit(): void {
    this.sports = this.sportService.getSports();
    // this.teamService.getTeams().subscribe(data => this.teams = data);
    this.teams = this.teamService.teams;
    console.log(this.teams);
  }
}
