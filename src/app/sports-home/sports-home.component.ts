import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportsService, SportInfo } from '../sports.service';
import { TeamService } from '../team.service';
import { Team } from '../team';

@Component({
  selector: 'app-sports-home',
  imports: [RouterLink],
  templateUrl: './sports-home.component.html',
  styleUrl: './sports-home.component.css'
})

export class SportsHomeComponent implements OnInit, OnDestroy {
  constructor() {}

  sp = input.required<number>();
  teamService = inject(TeamService);
  sportsService = inject(SportsService);
  sportInfo!: SportInfo[];
  sportTeams!: Team[];  
  
  ngOnInit() {
    console.log(this.sportsService.allTeams);
    //this.sportsService.getTeams().subscribe((teams: Team[]) => {this.sportTeams = teams})
    console.log(this.sportsService.teamCollection);
    // this.sportTeams = this.sportsService.genSportTeams(this.sp());
    // this.sportInfo = this.sportsService.getSportInfo(this.sp());
    //console.log(this.id())
    console.log(this.sportTeams);
  }

  ngOnDestroy() {
    console.clear()
  }
}
