import { Component, inject, input, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { TeamRosterComponent } from '../team-roster/team-roster.component';
import { TeamScheduleComponent } from '../team-schedule/team-schedule.component';
import { TeamHeaderComponent } from '../team-header/team-header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SportInfo, SportsService } from '../sports.service';


@Component({
  selector: 'app-team-view',
  imports: [TeamRosterComponent, TeamScheduleComponent, TeamHeaderComponent, FormsModule, RouterLink],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.css'
})

export class TeamViewComponent implements OnInit, OnDestroy {
  constructor() {};

  sp = input.required<number>(); //sportID
  tm = input.required<number>(); //TeamID

  //team!:Team;
  teamService = inject(TeamService)
  sportsService = inject(SportsService);
  focus:string= "info" //either info, roster, or schedule
  allTeams!: Team[];
  eachTeam!: Team;
  sportInfo!: SportInfo[];
  
  changeFocus(str:string) {
    this.focus = str
  }

  ngOnInit() {
    this.allTeams = this.sportsService.genSportTeams(this.sp());
    console.log(this.allTeams);
    this.sportInfo = this.sportsService.getSportInfo(this.sp());
    this.eachTeam = this.teamService.getTeam(this.tm());
    console.log(this.eachTeam);
    //console.log(this.id())
    //console.log(this.allSportTeams);
  }

  ngOnDestroy() {
    console.clear()
  }
}
