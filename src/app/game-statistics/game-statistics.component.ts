import { Component, inject, OnInit } from '@angular/core';
import { RainbowSixSiegeService } from '../rainbow-six-siege.service';
import { Sport } from '../sport';

@Component({
  selector: 'app-game-statistics',
  imports: [],
  templateUrl: './game-statistics.component.html',
  styleUrl: './game-statistics.component.css'
})
export class GameStatisticsComponent implements OnInit {
  categories: string[] = [];
  sport: Sport = Sport.RainbowSixSiege; // Hardcoding sport to Rainbow Six Siege for now
  matchID: number = 3; // Hardcoding match id to 3 for now

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);

  ngOnInit(): void {
    this.categories = this.siegeService.statCategories;
  }


}
