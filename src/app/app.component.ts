import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { GameStatisticsComponent } from "./game-statistics/game-statistics.component";
import { TeamViewComponent } from './team-view/team-view.component';
import { AdminPageComponent } from "./admin-page/admin-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameStatisticsComponent, AdminPageComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CSCI-313-Final-Project-PROgrammers';
}
