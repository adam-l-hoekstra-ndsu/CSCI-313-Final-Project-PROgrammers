import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameStatisticsComponent } from './game-statistics/game-statistics.component';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    GameStatisticsComponent,
    SportSelectionComponent,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CSCI-313-Final-Project-PROgrammers';

  adminLoggedIn = true;
}
