import { Component, inject, input, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { Team } from '../team';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-view',
  imports: [RouterLink],
  templateUrl: './player-view.component.html',
  styleUrl: './player-view.component.css'
})
export class PlayerViewComponent implements OnInit {
  teamId = input.required<string>()
  playerId = input.required<string>()
  sportId = input.required<number>()
  authService = inject(AuthService);

  teamService = inject(TeamService)
  playerService = inject(PlayerService)
  player!:Player;
  team!:Team;
  teams:Team[] = []
  firstName!:string;
  lastName!:string;
  bio!:string;
  age!:string;

  ngOnInit(): void {
    this.teamService.getTeam(this.teamId()).subscribe(data => {this.team = data}) 
    this.playerService.getPlayer(this.playerId()).subscribe(data => {
      this.player = data
      data.teams.forEach((i) => {
        
        this.teamService.getTeam(i).subscribe(t => this.teams.push(t))
      }) 
    })
    this.playerService.getPlayer(this.playerId()).subscribe(data => this.firstName = data.firstName)
    this.playerService.getPlayer(this.playerId()).subscribe(data => this.lastName = data.lastName)
    this.playerService.getPlayer(this.playerId()).subscribe(data => this.bio = data.bio)
    this.playerService.getPlayer(this.playerId()).subscribe(data => this.age =  String(data.age) )
  }
}
