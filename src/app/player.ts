import { KeyValue } from "@angular/common";

export interface Player {
    id: string;
    teams: string[];
    firstName: string;
    lastName: string;
    age: number;
    bio: string;
    photoUrl: string;
    stats: { [key: string]: number[] };
    avgStats: number[]
    currentlyInMatch: boolean;
}
