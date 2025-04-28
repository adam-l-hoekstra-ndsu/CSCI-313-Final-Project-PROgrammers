export interface Match {
    id: number;
    date: Date;
    sport: number; // 0 = Basketball, 1 = VolleyBall, 2 = Rainbow Six Siege, 3 = Football
    team1ID: number;
    team2ID: number;
    team1Score: number;
    team2Score: number;
    hasStarted: boolean;
    timeRemaining: number; // in seconds
}
