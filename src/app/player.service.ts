import { Injectable } from '@angular/core';
import { Team } from './team';
import { Player } from './player';
import { players } from './player-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players = players;

  constructor() { }

  getPlayerById(id: number): Player {
    return this.players.filter(player => player.id == id)[0];
  }

  calculateAvg(player: Player): number[] {
    let totalStats:number[] = []
    let numberOfStat:number[] = []
    let avgs:number[] = []
    for(let i = 0; i < Object.keys(player.stats).length; i++) {
      for(const match in Object.keys(player.stats)) {
        const stats = player.stats[match];
        for(const stat in stats) {
          totalStats[i] += Number(stat);
          numberOfStat[i] += 1;
        }
      }
      avgs[i] = totalStats[i]/numberOfStat[i]
    }
    return avgs;
  }

}
