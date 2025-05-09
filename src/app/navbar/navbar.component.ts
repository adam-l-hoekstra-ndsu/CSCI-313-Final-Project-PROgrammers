import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterState } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit {
  [x: string]: any;
  selectedSport: string | null = null;
  selectedTeam: string | null = null;
  selectedPlayer: string | null = null;
  selectedGame: string | null = null;
  
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
  routeR = inject(Router); //Used to display the back button in navbar.component.html

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Capture the parameters for Sport, Team, Player, and Game
    this.router.events.subscribe(() => {
      this.selectedSport = this.activatedRoute.snapshot.paramMap.get('sport');
      this.selectedTeam = this.activatedRoute.snapshot.paramMap.get('team');
      this.selectedPlayer = this.activatedRoute.snapshot.paramMap.get('player');
      this.selectedGame = this.activatedRoute.snapshot.paramMap.get('game');
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
