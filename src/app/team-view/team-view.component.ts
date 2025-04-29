import { Component, inject, input, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { TeamRosterComponent } from '../team-roster/team-roster.component';
import { TeamScheduleComponent } from '../team-schedule/team-schedule.component';
import { TeamHeaderComponent } from '../team-header/team-header.component';


@Component({
  selector: 'app-team-view',
  imports: [TeamRosterComponent, TeamScheduleComponent, TeamHeaderComponent],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.css'
})
export class TeamViewComponent implements OnInit {
  team!:Team;
  teamId = 3//input.required<number>();
  teamService = inject(TeamService)
  focus:string= "info" //either info, roster, or schedule
  
  changeFocus(str:string) {
    this.focus = str
  }

  ngOnInit(): void {
    this.team = this.teamService.getTeam(this.teamId) //this.teamId()
  }
}
