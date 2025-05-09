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
        this.searchService.search(this.query).subscribe((results) => {
          this.results = results;
          console.log('Search results: ', results);
        });
      } else {
        this.results = [];
      }
    });
  }

  navigateToResult(result: SearchResult): void {
    if (result.type === 'player') {
      this.playerService.getPlayer(result.id.toString()).subscribe((player) => {
        const playerId = player.id;
        console.log('Fetched player:', player);

        const teamIds = player.teams; // This is an array of team IDs
        console.log('Player team IDs:', teamIds);

        if (teamIds && teamIds.length > 0) {
          // Use the first team ID for now
          const teamId = teamIds[0];
          console.log('Searching for team with ID:', teamId);

          this.teamService.getTeam(teamId).subscribe((team) => {
            console.log('Fetched team:', team);

            if (team) {
              const sport = team.sport;
              console.log(
                'Navigating to player page with team:',
                team,
                'and sport:',
                sport
              );

              this.router.navigate(['/view-player', sport, teamId, playerId]);
            } else {
              console.warn(
                'Team not found for player, navigating to fallback route'
              );
              this.router.navigate([
                '/view-player',
                'no-sport',
                'no-team',
                playerId,
              ]);
            }
          });
        } else {
          console.warn('Player has no team, navigating to fallback route');
          this.router.navigate([
            '/view-player',
            'no-sport',
            'no-team',
            playerId,
          ]);
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
