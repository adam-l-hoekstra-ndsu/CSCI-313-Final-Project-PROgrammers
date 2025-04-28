import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor() { }

  footballPlayers: any[] = [
    {
      sport: "football", team: "NDSU Bisons", name: "Player 1",
      age: "20", hometown: "Minot, ND", height: "7' 9",
      weight: "245", prevTeam: "Sike!", yrJoined: "2022", academic: "Earth Bsc"
    },
    {sport: "football", team: "NDSU Bisons", name: "Player 2"},
    {sport: "football", team: "NDSU Bisons", name: "Player 3"},
    {sport: "football", team: "NDSU Bisons", name: "Player 4"},
    {sport: "football", team: "NDSU Bisons", name: "Player 5"},
    {sport: "football", team: "Cherries", name: "Player 1"},
    {sport: "football", team: "Cherries", name: "Player 2"},
    {sport: "football", team: "Cherries", name: "Player 3"},
    {sport: "football", team: "Cherries", name: "Player 4"},
    {sport: "football", team: "Cherries", name: "Player 5"},
    {sport: "football", team: "Kangaroos", name: "Player 1"},
    {sport: "football", team: "Kangaroos", name: "Player 2"},
    {sport: "football", team: "Kangaroos", name: "Player 3"},
    {sport: "football", team: "Kangaroos", name: "Player 4"},
    {sport: "football", team: "Kangaroos", name: "Player 5"},
  ];
}
