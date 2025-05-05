import { Routes } from '@angular/router';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { GameViewComponent } from './game-view/game-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-sports', component: SportSelectionComponent },
  { path: 'teams/:sport', component: TeamSelectionComponent },
  { path: 'team/:sport/:team', component: TeamViewComponent },
  { path: 'game/:sport/:team/:game', component: GameViewComponent },
  { path: 'player/:sport/:team/:player', component: PlayerViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-management', component: AdminPageComponent },
  { path: 'search', component: SearchResultsComponent },
];
