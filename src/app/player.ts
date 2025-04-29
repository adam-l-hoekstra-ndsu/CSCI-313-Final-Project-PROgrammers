import { KeyValue } from "@angular/common";

export interface Player {
    id: number;
    teams: number[];
    firstName: string;
    lastName: string;
    age: number;
    bio: string;
    photoUrl: string;
    stats: { [key: number]: number[] };
    currentlyInMatch: boolean;
}
