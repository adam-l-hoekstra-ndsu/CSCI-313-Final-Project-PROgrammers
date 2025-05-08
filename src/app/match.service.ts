import { Injectable, inject } from '@angular/core';
import { Match } from './match';
// import { matches } from './match-data';
import { Play } from './play';
import { QuarterOrRound } from './quarterOrRound';
import { Observable } from 'rxjs';
import { collection, collectionData, deleteDoc, doc, docData, setDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Team } from './team';
import { MatchStats } from './stat';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  addPlayToMatch(match: Match, play: Play) {
    match.quarterOrRoundResults[match.quarterOrRound - 1].plays.push(play);
    this.updateMatch(match.id, match);
  }

  private firestore = inject(Firestore);
  matchCollection = collection(this.firestore, 'match-data');

  constructor() { }

  removePlayFromMatch(match: Match, playToRemove: Play, quarterOrRound: QuarterOrRound) {
    quarterOrRound.plays = quarterOrRound.plays.filter(play => play != playToRemove );
    this.updateMatch(match.id, match);
  }

  removeQuarterOrRoundFromMatch(match: Match, quarterOrRound: QuarterOrRound) {
    match.quarterOrRoundResults = match.quarterOrRoundResults.filter(qr => qr != quarterOrRound);
    this.updateMatch(match.id, match);
  }

  // Firestore Methods
    getMatchById(id: string): Observable<Match> {
      const matchDocRef = doc(this.firestore, `match-data/${id}`);
      return docData(matchDocRef, { idField: 'id' }) as Observable<Match>;
    }
  
  
    getMatches(): Observable<Match[]>{
      return collectionData(this.matchCollection, ({idField: 'id'})) as Observable<Match[]>;
    }
  
    addMatch(team1: Team, team2: Team, date: Timestamp){
      let newMatch = {
        id: "notreasigned",
        date: date,
        team1ID: team1.id,
        team2ID: team2.id,
        team1Score: 0,
        team2Score: 0,
        hasStarted: false,
        hasFinished: false,
        timeRemaining: 0,
        quarterOrRound: 0,
        quarterOrRoundResults: []
      };
      const teamRef = doc(this.matchCollection);
      const newId = teamRef.id;
      newMatch.id = newId;
      setDoc(teamRef, newMatch);
      return newId;
    }
  
    updateMatch(id: string, match : Partial<Match>): Promise<void> {
      const matchDoc = doc(this.firestore, `match-data/${id}`);
      return updateDoc(matchDoc, {... match});
    }
  
    deleteTeam(id: string): Promise<void> {
      const teamDoc = doc(this.firestore, 'match-data/${id}');
      return deleteDoc(teamDoc);
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
    this.updateMatch(match.id, match);
  }

}