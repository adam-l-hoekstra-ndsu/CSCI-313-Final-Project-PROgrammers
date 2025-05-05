import { Injectable } from '@angular/core';

export interface SportInfo {
  id: number;
  name: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  constructor() {}

  getSports(): SportInfo[] {
    return [
      { id: 0, name: 'Football', imageUrl: 'images/football.jpg' },
      { id: 1, name: 'Basketball', imageUrl: 'images/basketball.jpg' },
      { id: 2, name: 'Volleyball', imageUrl: 'images/volleyball.jpg' },
      {
        id: 3,
        name: 'Rainbow Six Seige',
        imageUrl: 'images/rainbow-six-seige.jpg',
      },
    ];
  }
}
