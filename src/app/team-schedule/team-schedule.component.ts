import { Component, inject, Input, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { Match } from '../match';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-schedule',
  imports: [],
  templateUrl: './team-schedule.component.html',
  styleUrl: './team-schedule.component.css'
})
export class TeamScheduleComponent implements OnInit {
  matchService = inject(MatchService)
  teamService = inject(TeamService)
  matches!:Match[]
  @Input() teamId !: number

  homeOrAway(m:Match) {
    if (m.team1ID == this.teamId) {
      return "Home"
    }
    else{
      return "Away"
    }
  }

  getAgainst(m:Match) {
    if (m.team1ID == this.teamId) {
      return this.teamService.getTeam(m.team2ID).name
    }
    else {
      return this.teamService.getTeam(m.team1ID).name
    }
  }

  displayScore(m:Match) {
    if (m.team1ID == this.teamId) {
      return m.team1Score.toString()+"-"+m.team2Score.toString()
    }
    else {
      return m.team2Score.toString()+"-"+m.team1Score.toString()
    }
  }

  getResult(m:Match) {
    if (m.hasFinished == false) {
      return "TBD"
    }
    if (m.team1Score == m.team2Score) {
      return "TIE"
    }
    else {
      if (m.team1ID == this.teamId) {
        if (m.team1Score > m.team2Score) {
          return "W"
        } 
        else{
          return "L"
        }
      }
      else {
        if (m.team2Score > m.team1Score) {
          return "W"
        } 
        else{
          return "L"
        }
      }
    }
  }

  getStatus(m:Match) {
    if (m.hasFinished) {
      return "Completed"
    }
    else if (m.hasStarted) {
      return "In Progress"
    }
    else {
      return "Scheduled"
    }
  }

  ngOnInit(): void {
    this.matches = this.matchService.matches.filter(match => match.team1ID == this.teamId || match.team2ID == this.teamId).sort((a:Match, b:Match)=>{return b.date.getTime()-a.date.getTime()})
  }
}
