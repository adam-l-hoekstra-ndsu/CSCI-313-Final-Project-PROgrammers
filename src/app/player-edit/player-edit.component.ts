import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-player-edit',
  imports: [RouterLink, FormsModule],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.css'
})
export class PlayerEditComponent implements OnInit{
  
  teamId = input.required<string>()
  playerId = input.required<string>()
  sportId = input.required<number>()
  authService = inject(AuthService);

  teamService = inject(TeamService)
  playerService = inject(PlayerService)
  player!:Player;
  team!:Team;
  firstName!:string;
  lastName!:string;
  bio!:string;
  age!:string;

  commitChanges() {
    this.playerService.editPlayer(this.player, this.firstName, this.lastName, this.bio, this.age)
  }

  removePlayer(plr: Player) {
    this.playerService.leaveTeam(plr, this.team)
    this.teamService.playerLeave(plr, this.team)
  }

  ngOnInit(): void {
      //this.player = this.playerService.getPlayerById(this.playerId())
      // this.team = this.teamService.getTeam(this.teamId())
      this.teamService.getTeam(this.teamId()).subscribe(data => this.team = data) 
      this.playerService.getPlayer(this.playerId()).subscribe(data => this.player = data)
      this.playerService.getPlayer(this.playerId()).subscribe(data => this.firstName = data.firstName)
      this.playerService.getPlayer(this.playerId()).subscribe(data => this.lastName = data.lastName)
      this.playerService.getPlayer(this.playerId()).subscribe(data => this.bio = data.bio)
      this.playerService.getPlayer(this.playerId()).subscribe(data => this.age =  String(data.age) )
      // this.firstName = this.player.firstName
      // this.lastName = this.player.lastName
      // this.bio = this.player.bio
      // this.age = String(this.player.age)
  }
}
