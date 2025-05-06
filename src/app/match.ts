import { QuarterOrRound } from "./quarterOrRound";

export interface Match {
    id: number;
    date: Date;
    team1ID: string;
    team2ID: string;
    team1Score: number;
    team2Score: number;
    hasStarted: boolean;
    hasFinished: boolean;
    timeRemaining: number; // in seconds
    quarterOrRound: number; // number of current quarter or round
    quarterOrRoundResults: QuarterOrRound[]; // round or quarter results
}
