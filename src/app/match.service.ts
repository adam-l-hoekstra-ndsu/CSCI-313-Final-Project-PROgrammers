import { Injectable } from '@angular/core';
import { Match } from './match';
import { matches } from './match-data';
import { Play } from './play';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  addPlayToMatch(match: Match, play: Play) {
    match.quarterOrRoundResults[match.quarterOrRound].plays.push(play);
  }

  matches = matches;

  constructor() { }

  getMatchById(id: number): Match {
    return this.matches.filter(match => match.id === id)[0];
  }

  removePlayFromMatch(match: Match, play: Play) {
    const index = match.quarterOrRoundResults[match.quarterOrRound].plays.indexOf(play);
    if (index > -1) {
      match.quarterOrRoundResults[match.quarterOrRound].plays.splice(index, 1);
    }
  }

}
