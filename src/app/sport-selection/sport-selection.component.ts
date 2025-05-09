import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportsService, SportInfo } from '../sports.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sport-selection',
  imports: [CommonModule, RouterLink],
  templateUrl: './sport-selection.component.html',
  styleUrl: './sport-selection.component.css',
})

export class SportSelectionComponent implements OnInit {
  userService = inject(UserService);
  sportService = inject(SportsService);
  teamService = inject(TeamService);
  readonly authService = inject(AuthService);

  sports: SportInfo[] = [];

  @Input() sp!: number; //sp means sportID. The router passes either a 0, 1, 2, or, 3. this is how the sportHome page knows what sport it is routing to 

  ngOnInit(): void {
    this.sports = this.sportService.getSports();
    this.teamService.getTeams().subscribe(data => console.log(data));
  }
}
