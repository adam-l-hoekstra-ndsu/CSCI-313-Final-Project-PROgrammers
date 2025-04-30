import { Injectable } from '@angular/core';

export interface SportInfo {
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
      { name: 'Football', imageUrl: 'images/football.jpg' },
      { name: 'Basketball', imageUrl: 'images/basketball.jpg' },
      { name: 'Volleyball', imageUrl: 'images/volleyball.jpg' },
      {
        name: 'Rainbow Six Seige',
        imageUrl: 'images/rainbow-six-seige.jpg',
      },
    ];
  }
}
