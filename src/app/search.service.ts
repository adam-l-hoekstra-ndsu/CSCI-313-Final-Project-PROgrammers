// search.service.ts
import { Injectable, inject } from '@angular/core';
import { PlayerService } from './player.service';
import { TeamService } from './team.service';
import { SportsService } from './sports.service';
import { SearchResult } from './search-result';
import { forkJoin, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private playerService = inject(PlayerService);
  private teamService = inject(TeamService);
  private sportService = inject(SportsService);

  search(searchTerm: string) {
    const lowerTerm = searchTerm.toLowerCase();

    // Get and transform players
    const players = (this.playerService.players ?? [])
      .filter((player) =>
        (player.firstName + ' ' + player.lastName)
          .toLowerCase()
          .includes(lowerTerm)
      )
      .map((player) => ({
        id: player.id,
        name: player.firstName + ' ' + player.lastName,
        imageUrl: player.photoUrl,
        type: 'player',
      }));

    // Get and transform teams
    const teams = (this.teamService.teams ?? [])
      .filter((team) => team.name.toLowerCase().includes(lowerTerm))
      .map((team) => ({
        id: team.id,
        name: team.name,
        imageUrl: team.logoUrl,
        type: 'team',
      }));

    // Get and transform sports
    const sports = (this.sportService ?? [])
      .getSports()
      .filter((sport) => sport.name.toLowerCase().includes(lowerTerm))
      .map((sport) => ({
        id: sport.sportID,
        name: sport.name,
        imageUrl: sport.imageUrl,
        type: 'sport',
      }));

    // Combine all results into one array
    return [...players, ...teams, ...sports];
  }
}
