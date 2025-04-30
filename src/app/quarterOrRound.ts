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

export enum SiegeRoundResult {
    ATK_OBJ = "/ATK_OBJ.png",
    ATK_KILL = "/ATK_KILL.png",
    DEF_OBJ = "/DEF_OBJ.png",
    DEF_KILL = "/DEF_KILL.png",
    DEF_TIME = "/DEF_TIME.png",
}