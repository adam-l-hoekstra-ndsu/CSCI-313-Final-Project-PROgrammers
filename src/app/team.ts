import { Match } from './match';
import { Player } from './player';
import { Sport } from './sport';

export interface Team {
    id: string;
    name: string;
    sport: Sport;
    logoUrl: string;
    players: string[]; // Array of player IDs
    schedule: number[]; // Array of match IDs
    wins: number;
    losses: number;
    draws: number;
    legueSubsection: string;
}
