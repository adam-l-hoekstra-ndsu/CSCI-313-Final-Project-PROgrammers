import { Team } from "./team";

export const teams: Team[] = [
    {
        id: 1,
        name: "Team A",
        sport: 2, // Rainbow Six Siege
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
        sport: 1, // Volleyball
        logoUrl: "https://example.com/logoB.png",
        players: [2,4], // Array of player IDs
        schedule: [], // Array of match IDs
        wins: 8,
        losses: 7,
        draws: 2,
        legueSubsection: "Europe",
    },
];