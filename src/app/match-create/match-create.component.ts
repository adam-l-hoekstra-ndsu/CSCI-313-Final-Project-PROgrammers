import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatchService } from '../match.service';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Sport } from '../sport';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-match-create',
  imports: [RouterLink, FormsModule],
  templateUrl: './match-create.component.html',
  styleUrl: './match-create.component.css'
})
export class MatchCreateComponent {
  sportId = input.required<number>()
  teamId = input.required<string>()
  matchService = inject(MatchService)
  teamService = inject(TeamService)
  playerService = inject(PlayerService)
  
  team!: Team
  otherTeams!: Team[]
  opponent!: Team
  date!: Date

  teamPlayers!: Player[]
  opponentPlayers!: Player[]

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(data => this.otherTeams = data.filter(team => (team.id !== this.teamId()) && (team.sport == this.sportId())));
    this.teamService.getTeam(this.teamId()).subscribe(data => this.team = data);
  }

  commitChanges() {
    const dateObj = new Date(this.date);
    const matchId = this.matchService.addMatch(this.team, this.opponent, Timestamp.fromDate(dateObj));
    this.updatePlayerStats(matchId);
  }

  updatePlayerStats(matchId: string) {
    this.playerService.getPlayers().subscribe(data => {
      this.teamPlayers = data.filter(plr => plr.teams.includes(this.teamId()));
      this.opponentPlayers = data.filter(plr => plr.teams.includes(this.opponent.id));
      for (let i = 0; i < this.teamPlayers.length; i++) {
        if(this.sportId() == Sport.RainbowSixSiege) {
          this.teamPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        else if(this.sportId() == Sport.Basketball) {
          this.teamPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0];
        }
        else if(this.sportId() == Sport.Football) {
          this.teamPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0];
        }
        else if(this.sportId() == Sport.Volleyball) {
          this.teamPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.playerService.updatePlayer(this.teamPlayers[i].id, this.teamPlayers[i]);
      }
      for (let i = 0; i < this.opponentPlayers.length; i++) {
        if(this.sportId() == Sport.RainbowSixSiege) {
          this.opponentPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        else if(this.sportId() == Sport.Basketball) {
          this.opponentPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0];
        }
        else if(this.sportId() == Sport.Football) {
          this.opponentPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0];
        }
        else if(this.sportId() == Sport.Volleyball) {
          this.opponentPlayers[i].stats[matchId] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.playerService.updatePlayer(this.opponentPlayers[i].id, this.opponentPlayers[i]);
      }
    });
  }

}
