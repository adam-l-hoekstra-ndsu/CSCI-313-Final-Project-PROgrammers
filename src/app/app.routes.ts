import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';
import { LoginComponent } from './login/login.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { RosterEditComponent } from './roster-edit/roster-edit.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { AddPlayerRosterComponent } from './add-player-roster/add-player-roster.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';

export const routes: Routes = [
    {
        path: "",
        component: SportSelectionComponent,
        title: "Bison Base"
    },
    {
        path: "login",
        component: LoginComponent,
        title: "Admin"
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
        path: 'team-view/:id',
        component: TeamViewComponent,
        title: "Team View",
    },

    {
        path: 'edit-team/:id',
        component: TeamEditComponent,
        title: "Edit Team",
    },
    
];