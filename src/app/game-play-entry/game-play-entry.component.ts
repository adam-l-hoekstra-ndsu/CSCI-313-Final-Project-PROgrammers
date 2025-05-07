import { Component, inject, input, OnInit } from '@angular/core';
import { RainbowSixSiegeService, SiegeCatagory, SiegePlayType } from '../rainbow-six-siege.service';
import { Sport } from '../sport';
import { Player } from '../player';
import { Team } from '../team'
import { Play } from '../play';
import { TeamService } from '../team.service';
import { Match } from '../match';
import { MatchService } from '../match.service';
import { GameStatisticsComponent } from '../game-statistics/game-statistics.component';
import { SecondsToTimePipe } from '../seconds-to-time.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { QuarterOrRound, SiegeRoundResult } from '../quarterOrRound';
import { PlayEntryFormComponent } from "../play-entry-form/play-entry-form.component";
import { PlayEntryRoundHistoryComponent } from "../play-entry-round-history/play-entry-round-history.component";
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-game-play-entry',
  imports: [SecondsToTimePipe, FormsModule, GameStatisticsComponent, PlayEntryFormComponent, PlayEntryRoundHistoryComponent],
  templateUrl: './game-play-entry.component.html',
  styleUrl: './game-play-entry.component.css'
})
export class GamePlayEntryComponent {
  matchID = input.required<string>();
  match!: Match;
  
  team1!: Team;
  team2!: Team;

  team1Players!: Player[]
  team2Players!: Player[]

  sportEnum = Sport; // For use in the template
  siegeActionEnum = SiegePlayType; // For use in the template
  siegeRoundResultEnum = SiegeRoundResult; // For use in the template

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);
  teamService = inject(TeamService);
  matchService = inject(MatchService)
  playerService = inject(PlayerService)

  ngOnInit(): void {
    this.matchService.getMatchById(this.matchID()).subscribe(data => this.match = data);
    this.teamService.getTeam(this.match.team1ID).subscribe(data => this.team1 = data);
    this.teamService.getTeam(this.match.team2ID).subscribe(data => this.team2 = data);
    this.playerService.getPlayers().subscribe(data => this.team1Players = data.filter(plr => plr.teams.includes(this.team1.id)))
    this.playerService.getPlayers().subscribe(data => this.team2Players = data.filter(plr => plr.teams.includes(this.team2.id)))
  }

  onPlayDelete(play : Play, quarterOrRound: QuarterOrRound) {
    if(typeof play.playerActing == typeof SiegePlayType) {
      this.siegeService.reverseSiegeAction(this.match, play, quarterOrRound)
    }
  }

  // Known Issue: Delete Quarter or Round does not remove the stats from plays from the match.
  // Known Issue: Trade stats are irreversable.

}


