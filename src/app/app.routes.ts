import { Routes } from '@angular/router';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AppComponent } from './app.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { RosterEditComponent } from './roster-edit/roster-edit.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { SportsHomeComponent } from './sports-home/sports-home.component';
import { AddPlayerRosterComponent } from './add-player-roster/add-player-roster.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { GameViewComponent } from './game-view/game-view.component';
import { GamePlayEntryComponent } from './game-play-entry/game-play-entry.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-sports', component: SportSelectionComponent },
  { path: 'teams/:sport', component: TeamSelectionComponent },
  { path: 'player/:sport/:team/:player', component: PlayerViewComponent },
  { path: 'admin-management', component: AdminPageComponent },
  { path: 'search', component: SearchResultsComponent },
    {
        path: "login",
        component: LoginComponent,
        title: "Login"
    },
    {
        path: "sport/:sp",
        component: SportsHomeComponent,
    },
    {
        path: "sport/:sp/team/:tm",
        component: TeamViewComponent,
        title: "Team View",
    },
    {
        path: "edit-team/:id",
        component: TeamEditComponent,
        title: "Edit Team"
    },
    {
        path: "edit-roster/:id",
        component: RosterEditComponent,
        title: "Edit Roster"
    },
    {
        path: "edit-player/:teamId/:playerId",
        component: PlayerEditComponent,
        title: "Edit Player"
    },
    {
        path: "add-player-roster/:teamId",
        component: AddPlayerRosterComponent,
        title: "Add Player to Roster"
    },

    {
        path: 'team-view/:sportId/:teamId',
        component: TeamViewComponent,
        title: "Team View",
    },

    {
        path: 'edit-team/:id',
        component: TeamEditComponent,
        title: "Edit Team",
    },

    {
        path: "game-view/:matchID",
        component: GameViewComponent,
        title: "Game View"
    },

    {
        path: "game-play-entry/:matchID",
        component: GamePlayEntryComponent,
        title: "Game Play Entry"
    },
];
