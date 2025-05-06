import { Injectable, OnInit, inject } from '@angular/core';
import { Team } from './team';
import { Player } from './player';
import { PlayerService } from './player.service';
import { collection, Firestore, collectionData, doc, setDoc, DocumentReference, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SportInfo, SportsService } from './sports.service';
import { Sport } from './sport';

@Injectable({
  providedIn: 'root'
})

export class TeamService implements OnInit {
  
  teams: Team[] = [] //Note: This is a local SNAPSHOT of the firebase databse. Changes made to this array WILL NOT be updated on the Database

  playerService = inject(PlayerService);

  constructor() { }

  private firestore = inject(Firestore);
  teamCollection = collection(this.firestore, 'team-data');

  ngOnInit() {
    this.getTeams().subscribe(data => this.teams = data);
    console.log(this.teams);
  }

  // gt(){
  //   return this.teamCollection;
  // }

  // Firestore Methods
  getTeam(id: string): Observable<Team> {
    const teamDocRef = doc(this.firestore, `team-data/${id}`);
    return docData(teamDocRef, { idField: 'id' }) as Observable<Team>;
  }

  getTeams(): Observable<Team[]>{
    return collectionData(this.teamCollection, ({idField: 'id'})) as Observable<Team[]>;
  }

  addTeam(newTeam: Team){
    const teamRef = doc(this.teamCollection);
    const newId = teamRef.id;
    newTeam.id = newId;
    setDoc(teamRef, newTeam);
  }

  updateTeam(id: string, team : Partial<Team>): Promise<void> {
    const teamDoc = doc(this.firestore, `team-data/${id}`);
    return updateDoc(teamDoc, team);
  }

  deleteTeam(id: string): Promise<void> {
    const teamDoc = doc(this.firestore, `team-data/${id}`);
    return deleteDoc(teamDoc);
  }

  // This is the method used to build each sport in the sport-selection component
  

  //This is the method used to create a dataset of teams based on the sport selected and save it as an array in the sport-home component.
  getSportTeams(sport: Sport): Team[] {
    return this.teams.filter(team => team.sport == sport);
  }

  //This is the method used to create a dataset of information relating to the selected sport (e.g. sport name and sport picture)
  //and then save it as an array in the sport-home component 
  

  //this is the method used to generate all the teams for the sport selected in the sport-selection component
  genSportTeams(sport: Sport): Team[] {
    return this.teams.filter(team => team.sport == sport);
  }

  createTeam(named: string, sports: Sport, logo:string, league:string){
    let t:Team = {
      id: teams.length,
      name: named,
      sport: sports,
      logoUrl: logo,
      players: [],
      schedule: [],
      wins: 0,
      losses: 0,
      draws: 0,
      legueSubsection: league
    }
    teams.push(t)
  }

  editTeam(t:Team, name: string, league: string, logo: string) {
    t.name = name
    t.legueSubsection = league
    t.logoUrl = logo
  }

  getPlayerIDs(teamId: string): string[] {
    return this.teams.filter(team => team.id == teamId)[0].players;
  }

  playerLeave(playerToRemove: Player, team:Team) {
    // const teamSpec: Team = this.getTeam(team) *team argument is already a Team object
    // const index = team.players.indexOf(player)
    // teamSpec.players.splice(index,1)
    team.players = team.players.filter(player => player != playerToRemove.id);
  }

  playerJoin(plr :Player, team: Team) {
    // const teamSpec: Team = this.getTeam(team.id)
    // const index = teamSpec.players.indexOf(plr.id,0)
    // teamSpec.players.push(plr.id)
    team.players.push(plr.id);
  }

  getPlayers(team: Team): Player[] {
    let toReturn:Player[] = []
    team.players.forEach((playerId) => {
      toReturn.push(this.playerService.getPlayerById(playerId))});
    return toReturn;
  }
}
