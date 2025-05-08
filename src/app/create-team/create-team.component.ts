import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { Sport } from '../sport';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-team',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export class CreateTeamComponent {
  id = input.required<number>()
  teamService = inject(TeamService);
  readonly userService = inject(UserService)
  sportEnum = Sport
  team!: Team
  name: string=""
  league: string=""
  logo: string =""
  sport: Sport = Sport.Basketball

  commitChanges() {
    this.teamService.createTeam(this.name, this.sport, this.logo, this.league)
  }
}
