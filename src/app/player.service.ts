import { Injectable } from '@angular/core';
import { Team } from './team';
import { Player } from './player';
import { players } from './player-data';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  constructor() { }
  
  players = players;
  
  editPlayer(plr: Player, fname:string,  lname:string, bio:string, age:number) {
    plr.firstName = fname;
    plr.lastName = lname;
    plr.bio = bio;
    if (!Number.isNaN(Number(age))) {
      plr.age = age
    }    
  }

  getPlayerById(id: number): Player {
    return this.players.filter(player => player.id == id)[0];
  }

  calculateAvg(player: Player): number[]
  {
    const totalStats: number[] = [];
    const numberOfStat: number[] = [];
  
    // Loop through each match's stats
    for (const matchKey of Object.keys(player.stats)) {
      const stats = player.stats[Number(matchKey)]; // this is a number[]
  
      // Loop through each stat in the array
      stats.forEach((stat, index) => {
        totalStats[index] = (totalStats[index] || 0) + stat;
        numberOfStat[index] = (numberOfStat[index] || 0) + 1;
      });
    }
  
    // Calculate averages
    const avgs = totalStats.map((total, index) => total / numberOfStat[index]);
     return avgs;
  }

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
