import { Player } from './player';
import { SiegePlayType } from './rainbow-six-siege.service';

export interface Play {
    time: number; // in seconds
    playerActing: Player | null; // player who made the play
    playerEffected: Player | null;
    playerAssisting: Player | null;
    playAction: SiegePlayType | null; // action taken by the player (e.g., kill, assist, etc.), null represents other sports for now
    description: string; // description of the play
}
