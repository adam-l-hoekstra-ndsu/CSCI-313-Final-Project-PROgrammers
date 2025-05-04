import { Injectable } from '@angular/core';
import { Sport } from './sport';
import { Team } from './team';
import { teams } from './team-data';

export interface SportInfo {
  name: string;
  imageUrl: string;
  sportID: Sport;
}

@Injectable({
  providedIn: 'root',
})

export class SportsService {
  constructor() {}

  allTeams: Team[] = teams;
  sportTeams!: Team[];
  sportName: string = "";
  sportID: any;

  getSports(): SportInfo[] {
    return [
      { name: 'Football', imageUrl: 'images/football.jpg', sportID: Sport.Football },
      { name: 'Basketball', imageUrl: 'images/basketball.jpg', sportID: Sport.Basketball },
      { name: 'Volleyball', imageUrl: 'images/volleyball.jpg', sportID: Sport.Volleyball },
      { name: 'Rainbow Six Seige', imageUrl: 'images/rainbow-six-seige.jpg', sportID: Sport.RainbowSixSiege},
    ];
  }

  getSportInfo(s: string, sID: number): void{
    this.sportName = s;
    this.sportID = sID;
  }

  genSportTeams(): void {
    this.sportTeams = this.allTeams.filter(team => team.sport == this.sportID);
  }
}