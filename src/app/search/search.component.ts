import { Component, inject, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { SearchResult } from '../search-result';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  previousSearchTerm = '';

  private router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        !this.router.url.startsWith('/search')
      ) {
        this.previousSearchTerm = '';
      }
    });
  }

  onSearch(): void {
    const trimmed = this.searchTerm.trim();

    if (trimmed && trimmed !== this.previousSearchTerm) {
      this.previousSearchTerm = trimmed;
      this.router.navigate(['/search'], {
        queryParams: { q: trimmed },
      });
    } else if (!trimmed) {
      this.previousSearchTerm = '';
      this.router.navigate(['/']);
    }
  }
}
