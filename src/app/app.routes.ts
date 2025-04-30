import { Routes } from '@angular/router';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';
import { LoginComponent } from './login/login.component';

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
    }
];
