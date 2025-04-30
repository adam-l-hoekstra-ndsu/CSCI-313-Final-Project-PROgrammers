import { Routes } from '@angular/router';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { RosterEditComponent } from './roster-edit/roster-edit.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { AppComponent } from './app.component';

export const routes: Routes = [

    

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
        path: 'team-view/:id',
        component: TeamViewComponent,
        title: "Team View",
    },

];
