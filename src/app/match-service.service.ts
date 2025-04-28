import { Injectable } from '@angular/core';
import { Match } from './match';
import { matches } from './match-data';

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {

  matches = matches;

  constructor() { }

  getMatchById(id: number): Match {
    return this.matches.filter(match => match.id === id)[0];
  }
}
