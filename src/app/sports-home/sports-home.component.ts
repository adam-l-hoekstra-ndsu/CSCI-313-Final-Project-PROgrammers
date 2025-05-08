import { Component, inject, Input, input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportsService, SportInfo } from '../sports.service';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Sport } from '../sport';

@Component({
  selector: 'app-sports-home',
  imports: [RouterLink],
  templateUrl: './sports-home.component.html',
  styleUrl: './sports-home.component.css'
})

export class SportsHomeComponent implements OnInit, OnDestroy {
  teamService = inject(TeamService);
  sportsService = inject(SportsService);
  readonly authService = inject(AuthService);

  @Input() sp!: number; //sport ID passed through router
  @Input() id!: string; //sport ID passed through router

  sportInfo!: SportInfo[];
  sportTeams!: Team[]; 

  ngOnInit() {
    this.sportInfo = this.sportsService.getSportInfo(this.sp);
    this.teamService.getTeams().subscribe(data => this.sportTeams = data.filter(team => team.sport == this.sp)); // Filter teams for based on sport 
  }

  ngOnDestroy() {
    console.clear()
  }
}
