import { inject, Injectable } from '@angular/core';
import { Sport } from './sport';
import { Team } from './team';
import { collection, Firestore, collectionData, doc, setDoc } from '@angular/fire/firestore';
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
  constructor() {}

  // I moved all the getTeam methods to team service - Adam
}
