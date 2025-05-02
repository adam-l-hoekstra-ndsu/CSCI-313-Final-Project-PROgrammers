import { Injectable, inject } from '@angular/core';
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

  removeQuarterOrRoundFromMatch(match: Match, quarterOrRound: QuarterOrRound) {
    match.quarterOrRoundResults = match.quarterOrRoundResults.filter(qr => qr != quarterOrRound);
  }

  calculateMatchScore(match: Match) {
    let t1Score = 0;
    let t2Score = 0;

    match.quarterOrRoundResults.forEach(qr => {
      t1Score += qr.team1Score;
      t2Score += qr.team2Score;
    });

    match.team1Score = t1Score;
    match.team2Score = t2Score;
  }

}
