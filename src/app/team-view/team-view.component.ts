import { Component, inject, input, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { TeamRosterComponent } from '../team-roster/team-roster.component';
import { TeamScheduleComponent } from '../team-schedule/team-schedule.component';
import { TeamHeaderComponent } from '../team-header/team-header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-view',
  imports: [TeamRosterComponent, TeamScheduleComponent, TeamHeaderComponent, FormsModule, RouterLink],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.css'
})

export class TeamViewComponent implements OnInit {
  sportId = input.required<number>();
  teamId = input.required<string>();
  team!:Team;
  teamService = inject(TeamService)
  focus:string= "info" //either info, roster, or schedule
  allTeams!: Team[];
  
  changeFocus(str:string) {
    this.focus = str
  }

  ngOnInit(): void {
    this.teamService.getTeam(this.teamId()).subscribe(data => this.team = data) 
  }
}
