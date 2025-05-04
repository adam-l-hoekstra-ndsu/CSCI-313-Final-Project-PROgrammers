import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportsService, SportInfo } from '../sports.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-sports-home',
  imports: [RouterLink],
  templateUrl: './sports-home.component.html',
  styleUrl: './sports-home.component.css'
})

export class SportsHomeComponent implements OnInit {
  constructor() {}

  teamService = inject(TeamService);
  sportsService = inject(SportsService);
  
  ngOnInit() {
    console.log(this.sportsService.allTeams);
    this.sportsService.genSportTeams();
    console.log(this.sportsService.sportTeams);
  }
}
