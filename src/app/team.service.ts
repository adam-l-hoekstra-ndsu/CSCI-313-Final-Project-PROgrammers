import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
  constructor() { }

  footballTeams: any[] = [
    {name: "NDSU Bisons", school: "NDSU", manager: "Tom Braidy", coachStaff: ["Caleb", "Johnie", "Adam", "Efe"]},
    {name: "Cherries", school: "UND", manager: "Joel Imposter", coachStaff: ["Belac", "Einhoj", "Mada", "Efe"]},
    {name: "Kangaroos", school: "MSU", manager: "Tim Drinker", coachStaff: ["Mustafi", "Chill", "Fake", "Dennis"]},
    {name: "Tin Cans", school: "SDSU", manager: "Cavinger Haus", coachStaff: ["Belac", "Einhoj", "Mada", "Tommy"]},
    {name: "Ballers", school: "BSC", manager: "Jocob Sprit", coachStaff: ["Saka", "Chill", "Haaland", "Cristiano"]},
  ]
}
