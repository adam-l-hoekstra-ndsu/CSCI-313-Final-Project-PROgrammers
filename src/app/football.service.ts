import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})

export class FootballService {
  constructor() { }
  teams = inject(TeamService)

  name: string = "Football";

  teamStats: any[] = []
}
