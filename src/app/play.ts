import { BasketBallPlayType } from './basketball.service';
import { FootballPlayType } from './football.service';
import { Player } from './player';
import { SiegePlayType } from './rainbow-six-siege.service';
import { VolleyballPlayType } from './volleyball.service';

export interface Play {
    time: number; // in seconds
    playerActing: Player | null; // player who made the play
    playerEffected: Player | null;
    playerAssisting: Player | null;
    playAction: SiegePlayType | FootballPlayType | VolleyballPlayType | BasketBallPlayType | null; // action taken by the player 
    yards?: number
    description: string; // description of the play
}
