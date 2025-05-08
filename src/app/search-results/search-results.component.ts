import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchService } from '../search.service';
import { SearchResult } from '../search-result';
import { PlayerService } from '../player.service';
import { TeamService } from '../team.service';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-search-results',
  imports: [RouterLink],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  results: SearchResult[] = [];
  query = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);
  private playerService = inject(PlayerService);
  private teamService = inject(TeamService);
  private sportService = inject(SportsService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      if (this.query) {
        this.results = this.searchService.search(this.query);
        this.cdr.detectChanges();
        console.log('Search results: ', this.results);
      } else {
        this.results = [];
        this.cdr.detectChanges();
      }
    });
  }

  navigateToResult(result: SearchResult): void {
    if (result.type === 'player') {
      // Get the player from Firestore by ID
      this.playerService.getPlayer(result.id.toString()).subscribe((player) => {
        const playerId = player.id;

        // If the player is on at least one team, get the first team
        if (player.teams && player.teams.length > 0) {
          const teamId = player.teams[0];
          this.teamService.getTeam(teamId).subscribe((team) => {
            const sport = team.sport;
            this.router.navigate(['/player', sport, teamId, playerId]);
          });
        } else {
          // Handle case where player is not on a team
          this.router.navigate(['/player', 'no-sport', 'no-team', playerId]);
        }
      });
    } else if (result.type === 'team') {
      this.teamService.getTeam(result.id.toString()).subscribe((team) => {
        const sportId = team.sport; // Assuming sport is a Sport object
        const teamId = team.id;
        this.router.navigate(['/team-view', sportId, teamId]);
      });
    } else if (result.type === 'sport') {
      this.router.navigate(['/sport', result.id]);
    }
  }
}
