import { Component, inject, Input, OnInit } from '@angular/core';
import { SportSelectionComponent } from '../sport-selection/sport-selection.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  imports: [SportSelectionComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  readonly authService = inject(AuthService);

  ngOnInit(): void {
    
  }
}
