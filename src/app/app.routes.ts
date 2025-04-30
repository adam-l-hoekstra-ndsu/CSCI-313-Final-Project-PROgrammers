import { Routes } from '@angular/router';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';
import { LoginComponent } from './login/login.component';
import { GameViewComponent } from './game-view/game-view.component';

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
        path: "game-view/:matchID",
        component: GameViewComponent,
        title: "Game View"
    }
];
