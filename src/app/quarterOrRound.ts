import { Play } from './play';

export class QuarterOrRound {
    team1Score: number; // score of the team
    team2Score: number; // score of the team
    plays: Play[]; // list of plays in the quarter or round
    result?: SiegeRoundResult; // result of the quarter or round

    constructor(team1Score: number, team2Score: number, plays: Play[], result: SiegeRoundResult) {
        this.team1Score = team1Score;
        this.team2Score = team2Score;
        this.plays = plays;
        this.result = result;
    }
}

// Enum has to be declared here rather than in the service to avoid type errors in the template
export enum SiegeRoundResult {
    TEAM1_OBJ = "/ATK_OBJ.png",
    TEAM1_KILL = "/ATK_KILL.png",
    TEAM1_TIME = "/ATK_TIME.png",
    TEAM2_OBJ = "/DEF_OBJ.png",
    TEAM2_KILL = "/DEF_KILL.png",
    TEAM2_TIME = "/DEF_TIME.png",
}