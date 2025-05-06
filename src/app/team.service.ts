import { Injectable, OnInit, inject } from '@angular/core';
import { Team } from './team';
import { Player } from './player';
import { PlayerService } from './player.service';
import { collection, Firestore, collectionData, doc, setDoc, DocumentReference, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SportInfo } from './sports.service';
import { Sport } from './sport';

@Injectable({
  providedIn: 'root'
})

export class TeamService implements OnInit {
  
  teams!: Team[]  //Note: This is a local SNAPSHOT of the firebase databse. Changes made to this array WILL NOT be updated on the Database

  playerService = inject(PlayerService);

  constructor() { }

  private firestore = inject(Firestore);
  teamCollection = collection(this.firestore, 'team-data');

  sportInfo!: SportInfo[];

  ngOnInit() {
    this.getTeams().subscribe(data => this.teams = data);
  }

  // gt(){
  //   return this.teamCollection;
  // }

  // Firestore Methods
  getTeams(): Observable<Team[]>{
    return collectionData(this.teamCollection, ({idField: 'id'})) as Observable<Team[]>
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
  getSports(): SportInfo[] {
    return [
      { name: 'Football', imageUrl: 'images/football.jpg', sportID: Sport.Football },
      { name: 'Basketball', imageUrl: 'images/basketball.jpg', sportID: Sport.Basketball },
      { name: 'Volleyball', imageUrl: 'images/volleyball.jpg', sportID: Sport.Volleyball },
      { name: 'Rainbow Six Seige', imageUrl: 'images/rainbow-six-seige.jpg', sportID: Sport.RainbowSixSiege},
    ];
  }

  //This is the method used to create a dataset of teams based on the sport selected and save it as an array in the sport-home component.
  getSportTeams(sport: Sport): Team[] {
    return this.teams.filter(team => team.sport == sport);
  }

  //This is the method used to create a dataset of information relating to the selected sport (e.g. sport name and sport picture)
  //and then save it as an array in the sport-home component 
  getSportInfo(sport: Sport): SportInfo[] {
    this.sportInfo = this.getSports();
    return this.sportInfo.filter(sportInfo => sportInfo.sportID == sport);
  }

  //this is the method used to generate all the teams for the sport selected in the sport-selection component
  genSportTeams(sport: Sport): Team[] {
    return this.teams.filter(team => team.sport == sport);
  }


  getPlayerIDs(teamId: string): number[] {
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
