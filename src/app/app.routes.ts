import { Routes } from '@angular/router';
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
import { CreateTeamComponent } from './create-team/create-team.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

export const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        title: "Bison Base",
    },
    {
        path: 'all-sports',
        component: SportSelectionComponent
    },
    {
        path: 'player/:sport/:team/:player', 
        component: PlayerViewComponent 
    },
    { 
        path: 'admin-management',
        component: AdminPageComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'search', 
        component: SearchResultsComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        title: "Login"
    },
    {
        path: "sport/:sp",
        component: SportsHomeComponent,
    },
    {
        path: "edit-roster/:id",
        component: RosterEditComponent,
        title: "Edit Roster",
        canActivate: [AuthGuard]
    },
    {
        path: "edit-player/:sportId/:teamId/:playerId",
        component: PlayerEditComponent,
        title: "Edit Player",
        canActivate: [AuthGuard]
    },
    {
        path: "add-player-roster/:sportId/:teamId",
        component: AddPlayerRosterComponent,
        title: "Add Player to Roster",
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
    },
    {
        path: "game-view/:matchID",
        component: GameViewComponent,
        title: "Game View"
    },
    {
        path: "game-play-entry/:matchID",
        component: GamePlayEntryComponent,
        title: "Game Play Entry",
        canActivate: [AuthGuard]
    },
    {
        path: "create-team/:sportId",
        component: CreateTeamComponent,
        title: "Create Team",
        canActivate: [AuthGuard]
    },
    {
        path: "create-player/:sportId/:teamId",
        component: CreatePlayerComponent,
        title: "Create Player",
        canActivate: [AuthGuard]
    },
    {
        path: "feature_not_supported",
        component: ComingSoonComponent,
        title: "Sorry"
    },
    {
        path: "verify-email",
        component: VerifyEmailComponent,
        title: "Reset Password",
    }
];
