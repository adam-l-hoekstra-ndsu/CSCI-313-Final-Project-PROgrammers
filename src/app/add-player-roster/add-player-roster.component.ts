import { Component, inject, input, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-player-roster',
  imports: [RouterLink],
  templateUrl: './add-player-roster.component.html',
  styleUrl: './add-player-roster.component.css'
})
export class AddPlayerRosterComponent implements OnInit{
  teamId = input.required<number>()
  teamService = inject(TeamService)
  playerService = inject(PlayerService)
  team!: Team;
  playersFiltered!:Player[]
  playersToAdd!:Player[]
  onConfirm(plr:Player) {
    console.log(plr.firstName)
    this.teamService.playerJoin(plr, this.team)
    this.playerService.joinTeam(plr, this.team)
  }
  ngOnInit(): void {
      this.team = this.teamService.getTeam(this.teamId());
      this.playersFiltered = this.playerService.players.filter(player => !this.team.players.includes(player.id,0))
  }
}
