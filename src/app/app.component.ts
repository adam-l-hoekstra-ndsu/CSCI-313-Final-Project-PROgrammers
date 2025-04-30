import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameStatisticsComponent } from './game-statistics/game-statistics.component';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameStatisticsComponent, SportSelectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CSCI-313-Final-Project-PROgrammers';

  adminLoggedIn = true;
}
