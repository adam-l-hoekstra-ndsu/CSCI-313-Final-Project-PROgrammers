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

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private playerService = inject(PlayerService);
  private teamService = inject(TeamService);
  private sportService = inject(SportsService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      if (this.query) {
        this.results = this.searchService.search(this.query);
      } else {
        this.results = [];
      }
    });
  }

  navigateToResult(result: SearchResult): void {
    if (result.type === 'player') {
      //logic for navigation to player page
    } else if (result.type === 'team') {
      //logic for navigation to team page
    } else if (result.type === 'sport') {
      this.router.navigate(['/sport', result.id]);
    }
  }
}
