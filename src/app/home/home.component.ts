import { Component } from '@angular/core';
import { SportSelectionComponent } from '../sport-selection/sport-selection.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SportSelectionComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  adminLoggedIn = true;
}
