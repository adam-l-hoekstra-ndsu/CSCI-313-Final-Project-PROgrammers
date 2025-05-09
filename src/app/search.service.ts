// search.service.ts
import { Injectable, inject } from '@angular/core';
import { PlayerService } from './player.service';
import { TeamService } from './team.service';
import { SportsService } from './sports.service';
import { SearchResult } from './search-result';
import { forkJoin, Observable, map, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private playerService = inject(PlayerService);
  private teamService = inject(TeamService);
  private sportService = inject(SportsService);

  search(searchTerm: string) {
    const lowerTerm = searchTerm.toLowerCase();

    return combineLatest([
      this.playerService.getPlayers(),
      this.teamService.getTeams(),
      of(this.sportService.getSports()), // stays synchronous if already returning Observable
    ]).pipe(
      map(([players, teams, sports]) => {
        const playerResults: SearchResult[] = players
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

        const teamResults: SearchResult[] = teams
          .filter((team) => team.name.toLowerCase().includes(lowerTerm))
          .map((team) => ({
            id: team.id,
            name: team.name,
            imageUrl: team.logoUrl,
            type: 'team',
          }));

        const sportResults: SearchResult[] = sports
          .filter((sport) => sport.name.toLowerCase().includes(lowerTerm))
          .map((sport) => ({
            id: sport.sportID,
            name: sport.name,
            imageUrl: sport.imageUrl,
            type: 'sport',
          }));

        return [...playerResults, ...teamResults, ...sportResults];
      })
    );
  }
}
