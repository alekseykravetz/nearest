import { ISubmition } from './submition';
export interface IGame {
    id: string;
    title: string;
    createDate: string;
    endDate: string;
    timeLeftInSeconds: number;
    isEnded: boolean;
    numberToGuess?: number;
    winner: ISubmition;
}


