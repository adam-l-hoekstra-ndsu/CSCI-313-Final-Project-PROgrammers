import { Team } from './team';
import { Sport } from './sport';

export const teams: Team[] = [
    {
        id: 1,
        name: "Team A",
        sport: Sport.RainbowSixSiege,
        logoUrl: "https://example.com/logoA.png",
        players: [1,3], // Array of player IDs
        schedule: [], // Array of match IDs
        wins: 10,
        losses: 5,
        draws: 2,
        legueSubsection: "North America",
    },
    {
        id: 2,
        name: "Team B",
        sport: Sport.Volleyball,
        logoUrl: "https://example.com/logoB.png",
        players: [2,4,6], // Array of player IDs
        schedule: [1,2,3,4,5], // Array of match IDs
        wins: 8,
        losses: 7,
        draws: 2,
        legueSubsection: "Europe",
    },
    {
        id: 3,
        name: "Team C",
        sport: Sport.Basketball,
        logoUrl: "https://example.com/logoC.png",
        players: [5,6], // Array of player IDs
        schedule: [6], // Array of match IDs
        wins: 12,
        losses: 3,
        draws: 2,
        legueSubsection: "Asia",
    },
    {
        id: 4,
        name: "Team D",
        sport: Sport.Basketball,
        logoUrl: "https://example.com/logoD.png",
        players: [7,8], // Array of player IDs
        schedule: [], // Array of match IDs
        wins: 9,
        losses: 6,
        draws: 2,
        legueSubsection: "South America",
    },
    {
        id: 5,
        name: "Team E",
        sport: Sport.Volleyball,
        logoUrl: "https://example.com/logoB.png",
        players: [2,4], // Array of player IDs
        schedule: [], // Array of match IDs
        wins: 9,
        losses: 6,
        draws: 2,
        legueSubsection: "South America",
    },
    {
        id: 5,
        name: "Team B volleyball evil",
        sport: Sport.Volleyball,
        logoUrl: "https://example.com/logoB.png",
        players: [2,4,6], // Array of player IDs
        schedule: [1,2,3,4,5], // Array of match IDs
        wins: 8,
        losses: 7,
        draws: 2,
        legueSubsection: "Europe",
    },
];
