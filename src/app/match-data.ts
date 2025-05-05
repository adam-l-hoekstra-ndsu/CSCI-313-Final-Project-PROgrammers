import { Match } from "./match";
import { SiegeRoundResult } from "./quarterOrRound";

export const matches: Match[] = [
    {
        id: 1,
        date: new Date("2023-10-01T14:00:00"),
        team1ID: 2,
        team2ID: 5,
        team1Score: 100,
        team2Score: 95,
        hasStarted: true,
        hasFinished: true,
        timeRemaining: 0,
        quarterOrRound: 4,
        quarterOrRoundResults: [
            {team1Score: 25, team2Score: 16, plays: [ {time: 900, description: "Team 1 scored a goal!"}]},
            {team1Score: 21, team2Score: 32, plays: [ {time: 600, description: "Team 2 scored a goal!"}]},
            {team1Score: 27, team2Score: 18, plays: [ {time: 300, description: "Team 1 scored a goal!"}]},
            {team1Score: 27, team2Score: 29, plays: [ {time: 32, description: "Team 2 scored a goal!"}]},
        ],
    },
    {
        id: 2,
        date: new Date("2023-10-02T16:00:00"),
        team1ID: 5,
        team2ID: 2,
        team1Score: 3,
        team2Score: 2,
        hasStarted: true,
        hasFinished: true,
        timeRemaining: 0,
        quarterOrRound: 4,
        quarterOrRoundResults: [
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Team 1 scored a goal!"}]},
            {team1Score: 1, team2Score: 1, plays: [ {time: 600, description: "Team 2 scored a goal!"}]},
            {team1Score: 1, team2Score: 0, plays: [ {time: 300, description: "Team 1 scored a goal!"}]},
            {team1Score: 0, team2Score: 1, plays: [ {time: 32, description: "Team 2 scored a goal!"}]},
        ],
    },
    {
        id: 3,
        date: new Date("2023-10-03T18:00:00"),
        team1ID: 5,
        team2ID: 2,
        team1Score: 7,
        team2Score: 5,
        hasStarted: true,
        hasFinished: false,
        timeRemaining: 134,
        quarterOrRound: 4,
        quarterOrRoundResults: [
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_KILL},
            {team1Score: 1, team2Score: 1, plays: [ {time: 600, description: "Time Expired!"}], result: SiegeRoundResult.DEF_TIME},
            {team1Score: 1, team2Score: 0, plays: [ {time: 300, description: "Time Expired!"}], result: SiegeRoundResult.DEF_TIME},
            {team1Score: 0, team2Score: 1, plays: [ {time: 32, description: "Time Expired!"}], result: SiegeRoundResult.DEF_TIME},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_KILL},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_KILL},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_KILL},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_KILL},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_KILL},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_KILL},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_OBJ},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_OBJ},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_OBJ},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_OBJ},
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Player 1 Killed Player 2!"}], result: SiegeRoundResult.ATK_OBJ},
        ],
    },
    {
        id: 4,
        date: new Date("2023-10-04T20:00:00"),
        team1ID: 2,
        team2ID: 5,
        team1Score: 2,
        team2Score: 2,
        hasStarted: true,
        hasFinished: true,
        timeRemaining: 0,
        quarterOrRound: 4,
        quarterOrRoundResults: [
            {team1Score: 1, team2Score: 0, plays: [ {time: 900, description: "Team 1 scored a goal!"}]},
            {team1Score: 1, team2Score: 1, plays: [ {time: 600, description: "Team 2 scored a goal!"}]},
            {team1Score: 1, team2Score: 0, plays: [ {time: 300, description: "Team 1 scored a goal!"}]},
            {team1Score: 0, team2Score: 1, plays: [ {time: 32, description: "Team 2 scored a goal!"}]},
        ],
        
    },

    {
        id: 5,
        date: new Date("2025-04-28T19:30:00"),
        team1ID: 1,
        team2ID: 3,
        team1Score: 87,
        team2Score: 90,
        hasStarted: true,
        hasFinished: true,
        timeRemaining: 0,
        quarterOrRound: 4,
        quarterOrRoundResults: [
            {
                team1Score: 22,
                team2Score: 18,
                plays: [
                    { time: 850, description: "Team 1 hit a three-pointer!" }
                ]
            },
            {
                team1Score: 20,
                team2Score: 24,
                plays: [
                    { time: 570, description: "Team 2 made a fast break layup!" }
                ]
            },
            {
                team1Score: 19,
                team2Score: 23,
                plays: [
                    { time: 312, description: "Team 2 scored from the paint!" }
                ]
            },
            {
                team1Score: 26,
                team2Score: 25,
                plays: [
                    { time: 45, description: "Team 1 nailed a buzzer beater!" }
                ]
            }
        ]
    },
    {
        id: 6,
        date: new Date("2025-05-01T16:00:00"),
        team1ID: 5,
        team2ID: 2,
        team1Score: 102,
        team2Score: 97,
        hasStarted: true,
        hasFinished: true,
        timeRemaining: 0,
        quarterOrRound: 4,
        quarterOrRoundResults: [
            {
                team1Score: 24,
                team2Score: 22,
                plays: [
                    { time: 765, description: "Team 2 opened with a steal and score!" }
                ]
            },
            {
                team1Score: 28,
                team2Score: 20,
                plays: [
                    { time: 480, description: "Team 1 went on a 10–2 run!" }
                ]
            },
            {
                team1Score: 20,
                team2Score: 25,
                plays: [
                    { time: 200, description: "Team 2 hit back-to-back threes!" }
                ]
            },
            {
                team1Score: 30,
                team2Score: 30,
                plays: [
                    { time: 60, description: "Team 1 sealed it with a dunk!" }
                ]
            }
        ]
    },
    {
        id: 7,
        date: new Date("2025-05-03T20:45:00"),
        team1ID: 6,
        team2ID: 1,
        team1Score: 95,
        team2Score: 95,
        hasStarted: true,
        hasFinished: false,
        timeRemaining: 120,
        quarterOrRound: 4,
        quarterOrRoundResults: [
            {
                team1Score: 23,
                team2Score: 21,
                plays: [
                    { time: 830, description: "Team 1 dominated the opening minutes!" }
                ]
            },
            {
                team1Score: 18,
                team2Score: 24,
                plays: [
                    { time: 420, description: "Team 2's defense forced turnovers!" }
                ]
            },
            {
                team1Score: 26,
                team2Score: 25,
                plays: [
                    { time: 180, description: "Back-and-forth threes from both teams!" }
                ]
            },
            {
                team1Score: 28,
                team2Score: 25,
                plays: [
                    { time: 120, description: "Tied game with 2 minutes remaining!" }
                ]
            }
        ]
    }
    
]