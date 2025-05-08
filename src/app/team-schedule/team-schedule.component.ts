import { Component, inject, Input, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { Match } from '../match';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { AuthService } from '../auth.service';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-schedule',
  imports: [RouterLink],
  templateUrl: './team-schedule.component.html',
  styleUrl: './team-schedule.component.css'
})

export class TeamScheduleComponent implements OnInit {
  matchService = inject(MatchService)
  teamService = inject(TeamService)
  authService = inject(AuthService);
  
  matches!:Match[]
  teams1:Team[] = []
  teams2:Team[] = []
  @Input() teamId !: string

  homeOrAway(m:Match) {
    if (m.team1ID == this.teamId) {
      return "Home"
    }
    else{
      return "Away"
    }
  }

  getAgainst(m:Match) {
    if (m.team2ID == this.teamId) {
      for(const t of this.teams1) {
        if (t.id = m.team1ID) {
          return t.name
        }
      }
      
    }
    else {
      for(const t of this.teams2) {
        if (t.id = m.team2ID) {
          return t.name
        }
      }
    }
    return "not found"
  }

  getAgainstTeam(m:Match) {
    if (m.team2ID == this.teamId) {
      for(const t of this.teams1) {
        if (t.id = m.team1ID) {
          return t
        }
      }
      
    }
    else {
      for(const t of this.teams2) {
        if (t.id = m.team2ID) {
          return t
        }
      }
    }
    return this.teams1[0]
  }

  // getAgainst(m: Match): Observable<string> {
  //   const id = m.team1ID === this.teamId ? m.team1ID : m.team2ID;
  //   return this.teamService.getName(id);
  // }

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
  //this.matchService.getMatches().subscribe(data => this.matches = data.filter(match => match.team1ID == this.teamId || match.team2ID == this.teamId).sort((a:Match, b:Match)=>{return b.date.toDate().getTime()-a.date.toDate().getTime()}));
//   this.matchService.getMatches().subscribe(data => {
//     this.matches = data.filter(match => match.team1ID == this.teamId || match.team2ID == this.teamId).sort((a:Match, b:Match)=>{return b.date.toDate().getTime()-a.date.toDate().getTime()})
//     this.teams = this.teamService.getTeam(t =)
// });
  this.matchService.getMatches().subscribe(data => {
    this.matches = data.filter(match => match.team1ID == this.teamId || match.team2ID == this.teamId).sort((a:Match, b:Match)=>{return b.date.toDate().getTime()-a.date.toDate().getTime()})
      for (let match of this.matches) {
        this.teamService.getTeam(match.team1ID).subscribe(d => {
          this.teams1.push(d)
        });
        this.teamService.getTeam(match.team2ID).subscribe(d => {
          this.teams2.push(d)
        });
      }
    });
  }
}
