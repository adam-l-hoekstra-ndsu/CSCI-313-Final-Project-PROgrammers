import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportsService, SportInfo } from '../sports.service';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { Firestore } from '@angular/fire/firestore';

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
  firestore = inject(Firestore) 
  
  ngOnInit() {
    console.log(this.teamService.teams);
    this.teamService.getTeams().subscribe(data => this.sportTeams = data)
    console.log(this.teamService.teams);
    this.sportTeams = this.teamService.genSportTeams(this.sp());
    this.sportInfo = this.sportsService.getSportInfo(this.sp());
    console.log(this.sportTeams);
  }

  ngOnDestroy() {
    console.clear()
  }
}
