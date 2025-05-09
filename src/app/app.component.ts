import { Component, inject, OnDestroy } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { GameStatisticsComponent } from "./game-statistics/game-statistics.component";
import { GameViewComponent } from './game-view/game-view.component';
import { GamePlayEntryComponent } from "./game-play-entry/game-play-entry.component";
import { TeamViewComponent } from './team-view/team-view.component';
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    GameStatisticsComponent,
    AdminPageComponent,
    TeamViewComponent,
    GameViewComponent, 
    GamePlayEntryComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnDestroy {
  readonly authService = inject(AuthService);
  title = 'Bison Base';

  ngOnDestroy(): void {
    this.authService.logOut();
  }
}
