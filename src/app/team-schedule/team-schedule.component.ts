import { Component, input, inject, OnInit, OnDestroy, Input } from '@angular/core';
import { SportInfo, SportsService } from '../sports.service';
import { TeamService } from '../team.service';
import { Team } from '../team';

@Component({
  selector: 'app-team-schedule',
  imports: [],
  templateUrl: './team-schedule.component.html',
  styleUrl: './team-schedule.component.css'
})

export class TeamScheduleComponent implements OnInit, OnDestroy{
  constructor() {}

  sportsService = inject(SportsService);
  teamService = inject(TeamService);
  allTeams!: Team[];
  eachTeam!: Team;
  sportInfo!: SportInfo[];

  @Input() tm!: number;
  @Input() sp!: number;

  ngOnInit(): void {
    this.allTeams = this.sportsService.genSportTeams(this.sp);
    console.log(this.allTeams);
    this.sportInfo = this.sportsService.getSportInfo(this.sp);
    this.eachTeam = this.teamService.getTeam(this.tm);
    console.log(this.eachTeam);
    //console.log(this.id())
    //console.log(this.allSportTeams);
  }

  ngOnDestroy() {
    console.clear()
  }
}
