import { inject, Injectable } from '@angular/core';
import { Sport } from './sport';
import { Team } from './team';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface SportInfo {
  name: string;
  imageUrl: string;
  sportID: Sport;
}

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  sportInfo!: SportInfo[];

  constructor() {}

  getSports(): SportInfo[] {
    return [
      {
        name: 'Football',
        imageUrl: 'images/football.jpg',
        sportID: Sport.Football,
      },
      {
        name: 'Basketball',
        imageUrl: 'images/basketball.jpg',
        sportID: Sport.Basketball,
      },
      {
        name: 'Volleyball',
        imageUrl: 'images/volleyball.jpg',
        sportID: Sport.Volleyball,
      },
      {
        name: 'Rainbow Six Siege',
        imageUrl: 'images/rainbow-six-seige.jpg',
        sportID: Sport.RainbowSixSiege,
      },
    ];
  }

  getSportInfo(sport: Sport): SportInfo[] {
    this.sportInfo = this.getSports();
    return this.sportInfo.filter((sportInfo) => sportInfo.sportID == sport);
  }
}
