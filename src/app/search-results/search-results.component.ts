import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      if (this.query) {
        // this.results = this.searchService.search(this.query);      needs to be updated for id string
      } else {
        this.results = [];
      }
    });
  }

  navigateToResult(result: SearchResult): void {
    if (result.type === 'player') {
      //Needs fixing
      const player = this.playerService.getPlayerById(result.id.toString());
      //const sport = player.; // or player.sportId
      const team = player.teams; // or player.teamId
      const playerId = player.id; // or use player.id if needed
      //this.router.navigate(['/player', sport, team, playerId]);
    } else if (result.type === 'team') {
      const team = this.teamService
        .getTeam(result.id.toString())
        .subscribe((team) => {
          const sportId = team;
          const teamId = team.id;
          this.router.navigate(['/team-view', sportId, teamId]);
        });
    } else if (result.type === 'sport') {
      this.router.navigate(['/sport', result.id]);
    }
  }
}
