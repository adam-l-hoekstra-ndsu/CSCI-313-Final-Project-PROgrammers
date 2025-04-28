import { Component, inject, OnInit } from '@angular/core';
import { RainbowSixSiegeService } from '../rainbow-six-siege.service';

@Component({
  selector: 'app-game-statistics',
  imports: [],
  templateUrl: './game-statistics.component.html',
  styleUrl: './game-statistics.component.css'
})
export class GameStatisticsComponent implements OnInit {
  categories: string[] = [];
  sportID: number = 2; // Hardcoding sport id to Rainbow Six Siege for now
  matchID: number = 3; // Hardcoding match id to 3 for now

  constructor() {}

  siegeService = inject(RainbowSixSiegeService);

  ngOnInit(): void {
    this.categories = this.siegeService.statCategories;
  }


}
