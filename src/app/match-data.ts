import { Match } from "./match";

export const matches: Match[] = [
    {
        id: 1,
        date: new Date("2023-10-01T14:00:00"),
        sport: 0, // Basketball
        team1ID: 1,
        team2ID: 2,
        team1Score: 100,
        team2Score: 95,
        hasStarted: true,
        timeRemaining: 0,
    },
    {
        id: 2,
        date: new Date("2023-10-02T16:00:00"),
        sport: 1, // Volleyball
        team1ID: 3,
        team2ID: 4,
        team1Score: 3,
        team2Score: 2,
        hasStarted: true,
        timeRemaining: 0,
    },
    {
        id: 3,
        date: new Date("2023-10-03T18:00:00"),
        sport: 2, // Rainbow Six Siege
        team1ID: 5,
        team2ID: 6,
        team1Score: 7,
        team2Score: 5,
        hasStarted: true,
        timeRemaining: 0,
    },
    {
        id: 4,
        date: new Date("2023-10-04T20:00:00"),
        sport: 3, // Football
        team1ID: 7,
        team2ID: 8,
        team1Score: 2,
        team2Score: 2,
        hasStarted: true,
        timeRemaining: 0,
    },
]