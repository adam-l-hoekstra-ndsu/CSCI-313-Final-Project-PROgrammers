import { Match } from './match';
import { Player } from './player';

export interface Team {
    id: number;
    name: string;
    sport: number; // 0 = Basketball, 1 = VolleyBall, 2 = Rainbow Six Siege, 3 = Football
    logoUrl: string;
    players: number[]; // Array of player IDs
    schedule: number[]; // Array of match IDs
    wins: number;
    losses: number;
    draws: number;
    legueSubsection: string;
}
