import { inject, Injectable, OnInit } from '@angular/core';
import { Team } from './team';
import { Player } from './player';
// import { players } from './player-data';
import { TeamService } from './team.service';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlayerService implements OnInit {
  constructor() { }
  
  players!: Player[]

  private firestore = inject(Firestore);
  playerCollection = collection(this.firestore, 'player-data');

  ngOnInit(): void {
      this.getPlayers().subscribe(data => this.players = data);
  }
  
  editPlayer(plr: Player, fname:string,  lname:string, bio:string, age:string) {
    plr.firstName = fname;
    plr.lastName = lname;
    plr.bio = bio;
    if (!Number.isNaN(Number(age))) {
      plr.age = Number(age)
    }    
    else {
      plr.age = -1
    }
  }

  createPlayer(fname:string, lname:string, bios:string, age:string) {

    let testAge :number = 0
    if (!Number.isNaN(Number(age))) {
      testAge = Number(age)
    }    
    else {
      testAge = -1
    }
    const playerRef = doc(this.playerCollection)
    let plr : Player = {
      id: "changeme",
      teams:[],
      firstName: fname,
      lastName: lname,
      age: testAge,
      bio: bios,
      photoUrl: "",
      stats: {},
      avgStats: [],
      currentlyInMatch: false
    }
    this.addPlayer(plr)
    
  }

  leaveTeam(plr: Player, team: Team) {
    const index = plr.teams.indexOf(team.id,0)
    plr.teams.splice(index,1)
  }

  joinTeam(plr: Player, team: Team) {
    plr.teams.push(team.id)
  }

  getPlayerById(id: string): Player {
    return this.players.filter(player => player.id == id)[0];
  }

  // Firestore Methods
    getPlayer(id: string): Observable<Player> {
      const playerDocRef = doc(this.firestore, `player-data/${id}`);
      return docData(playerDocRef, { idField: 'id' }) as Observable<Player>;
    }
  
    getPlayers(): Observable<Player[]>{
      return collectionData(this.playerCollection, ({idField: 'id'})) as Observable<Player[]>
    }
  
    addPlayer(newPlayer: Player){
      const playerRef = doc(this.playerCollection);
      const newId = playerRef.id;
      newPlayer.id = newId;
      setDoc(playerRef, newPlayer);
    }
  
    updateTeam(id: string, team : Partial<Team>): Promise<void> {
      const teamDoc = doc(this.firestore, `team-data/${id}`);
      return updateDoc(teamDoc, team);
    }
  
    deleteTeam(id: string): Promise<void> {
      const teamDoc = doc(this.firestore, `team-data/${id}`);
      return deleteDoc(teamDoc);
    }

  calculateAvg(player: Player, team: Team): number[] {
    const totalStats: number[] = [];
    const numberOfStat: number[] = [];
  
    // Loop through only the matches specified in team.matches
    for (const matchIndex of team.schedule) {
      const stats = player.stats[matchIndex]; // this is a number[]
      if (!stats) continue; // skip if player has no stats for this match
  
      stats.forEach((stat, index) => {
        totalStats[index] = (totalStats[index] || 0) + stat;
        numberOfStat[index] = (numberOfStat[index] || 0) + 1;
      });
    }
  
    // Calculate averages
    const avgs = totalStats.map((total, index) =>
      numberOfStat[index] ? total / numberOfStat[index] : 0
    );
    return avgs;
  }

  // calculateAvg(player: Player, team:Team): number[]
  // {
  //   const totalStats: number[] = [];
  //   const numberOfStat: number[] = [];
  
  //   // Loop through each match's stats
  //   for (const matchKey of Object.keys(player.stats)) {
  //     const stats = player.stats[Number(matchKey)]; // this is a number[]
  
  //     // Loop through each stat in the array
  //     stats.forEach((stat, index) => {
  //       totalStats[index] = (totalStats[index] || 0) + stat;
  //       numberOfStat[index] = (numberOfStat[index] || 0) + 1;
  //     });
  //   }
  
  //   // Calculate averages
  //   const avgs = totalStats.map((total, index) => total / numberOfStat[index]);
  //    return avgs;
  // }

//  calculateAvg2(player: Player): number[] {
//    let totalStats:number[] = []
//    let numberOfStat:number[] = []
//    let avgs:number[] = []
    
//    for(let i = 0; i < Object.keys(player.stats).length; i++) {
//      for(const match in Object.keys(player.stats)) {
//        const stats = player.stats[match];
//        for(const stat in stats) {
//          totalStats[i] += Number(stat);
//          numberOfStat[i] += 1;
//       }
//      }
//      avgs[i] = totalStats[i]/numberOfStat[i]
//      }
//    return avgs;
//  }
}
