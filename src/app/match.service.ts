import { Injectable } from '@angular/core';
import { Match } from './match';
import { matches } from './match-data';
import { Play } from './play';
import { QuarterOrRound } from './quarterOrRound';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  addPlayToMatch(match: Match, play: Play) {
    match.quarterOrRoundResults[match.quarterOrRound - 1].plays.push(play);
  }

  matches = matches;

  constructor() { }

  getMatchById(id: number): Match {
    return this.matches.filter(match => match.id === id)[0];
  }

  removePlayFromMatch(match: Match, playToRemove: Play, quarterOrRound: QuarterOrRound) {
    quarterOrRound.plays = quarterOrRound.plays.filter(play => play != playToRemove );
    
  }

}
