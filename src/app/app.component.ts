import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameStatisticsComponent } from "./game-statistics/game-statistics.component";
import { TeamViewComponent } from './team-view/team-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameStatisticsComponent, TeamViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CSCI-313-Final-Project-PROgrammers';
}
