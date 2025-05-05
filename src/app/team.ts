import { Match } from './match';
import { Player } from './player';
import { Sport } from './sport';

export interface Team {
    id: number;
    name: string;
    sport: Sport;
    logoUrl: string;
    players: number[]; // Array of player IDs
    schedule: { [key: string]: any }[]; // Array of match IDs
    wins: number;
    losses: number;
    draws: number;
    legueSubsection: string;
}
