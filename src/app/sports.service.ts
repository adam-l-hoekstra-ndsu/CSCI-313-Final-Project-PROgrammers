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
  sportInfo!: SportInfo[];

  // This is the method used to build each sport in the sport-selection component
  initSports(): SportInfo[] {
    return [
      { name: 'Football', imageUrl: 'fb00.png', sportID: Sport.Football },
      { name: 'Basketball', imageUrl: 'bb00.png', sportID: Sport.Basketball },
      { name: 'Volleyball', imageUrl: 'vb00.png', sportID: Sport.Volleyball },
      { name: 'Rainbow Six Seige', imageUrl: 'rbss00.png', sportID: Sport.RainbowSixSiege},
    ];
  }

  //This is the method used to create a dataset of teams based on the sport selected and save it as an array in the sport-home component.
  getSportTeams(id:number): Team[] {
    return this.allTeams.filter(team => team.sport == id);
  }

  //This is the method used to create a dataset of information relating to the selected sport (e.g. sport name and sport picture)
  //and then save it as an array in the sport-home component 
  getSportInfo(id:number): SportInfo[] {
    this.sportInfo = this.initSports();
    return this.sportInfo.filter(sport => sport.sportID == id);
  }

  //this is the method used to generate all the teams for the sport selected in the sport-selection component
  genSportTeams(id:number): Team[] {
    return this.allTeams.filter(team => team.sport == id);
  }
}