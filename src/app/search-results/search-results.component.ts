import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService } from '../search.service';
import { SearchResult } from '../search-result';

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
  private searchService = inject(SearchService);

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
}
