import { Team } from './team';
import { Sport } from './sport';

export const teams: Team[] = [
  {
    id: 1,
    name: 'Team A',
    sport: Sport.RainbowSixSiege,
    logoUrl: 'https://example.com/logoA.png',
    players: [1, 3], // Array of player IDs
    schedule: [], // Array of match IDs
    wins: 10,
    losses: 5,
    draws: 2,
    legueSubsection: 'North America',
  },
  {
    id: 2,
    name: 'Team B',
    sport: Sport.Volleyball,
    logoUrl: 'https://example.com/logoB.png',
    players: [2, 4], // Array of player IDs
    schedule: [], // Array of match IDs
    wins: 8,
    losses: 7,
    draws: 2,
    legueSubsection: 'Europe',
  },
  {
    id: 2,
    name: 'NDSU Volleyball - Women Team',
    sport: Sport.Volleyball,
    logoUrl:
      'https://logowik.com/content/uploads/images/ndsu-north-dakota-state-university-bison8345.logowik.com.webp',
    players: [2, 3], // Array of player IDs
    schedule: [], // Array of match IDs
    wins: 13,
    losses: 2,
    draws: 0,
    legueSubsection: 'North America',
  },
  {
    id: 2,
    name: 'NDSU Volleyball - Men Team',
    sport: Sport.Volleyball,
    logoUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FNDSUvolleyball%2F&psig=AOvVaw3R0cmbvdpnEuFbGzjiHH9q&ust=1745955109724000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIi-uOS7-4wDFQAAAAAdAAAAABAU',
    players: [1, 4], // Array of player IDs
    schedule: [], // Array of match IDs
    wins: 6,
    losses: 9,
    draws: 2,
    legueSubsection: 'North America',
  },
];
