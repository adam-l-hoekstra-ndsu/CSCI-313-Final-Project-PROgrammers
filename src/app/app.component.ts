import { Component } from '@angular/core'
import { RouterOutlet, RouterLink } from '@angular/router';
import { GameStatisticsComponent } from "./game-statistics/game-statistics.component";
import { GameViewComponent } from './game-view/game-view.component';
import { GamePlayEntryComponent } from "./game-play-entry/game-play-entry.component";
import { TeamViewComponent } from './team-view/team-view.component';
import { AdminPageComponent } from "./admin-page/admin-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, GameStatisticsComponent, AdminPageComponent, TeamViewComponent, GameViewComponent, GamePlayEntryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CSCI-313-Final-Project-PROgrammers';
}
