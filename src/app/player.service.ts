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

}
