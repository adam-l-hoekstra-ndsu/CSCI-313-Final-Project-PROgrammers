import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userStatus = 'true';
  token!: string | null; 
  selectedSport: string | null = null;
  selectedTeam: string | null = null;
  selectedPlayer: string | null = null;
  selectedGame: string | null = null;
  
  readonly authService = inject(AuthService);
  user = this.authService.getUser();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.token = this.authService.token;
    this.router.events.subscribe(() => {
      // Capture the parameters for Sport, Team, Player, and Game
      this.selectedSport = this.activatedRoute.snapshot.paramMap.get('sport');
      this.selectedTeam = this.activatedRoute.snapshot.paramMap.get('team');
      this.selectedPlayer = this.activatedRoute.snapshot.paramMap.get('player');
      this.selectedGame = this.activatedRoute.snapshot.paramMap.get('game');
    });
  }

  // isLoggedIn(): boolean {
  //   // write method to check user status here
  //   return this.userStatus;
  // }

  logOut() {
    this.authService.logOut();
  }

  
}
