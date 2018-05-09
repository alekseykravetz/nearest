import { ISubmition } from './submition';
export interface IGame {
    id: string;
    title: string;
    createDate: string;
    endDate?: Date;
    isEnded: boolean;
    numberToGuess?: number;
    winner: ISubmition;
    timeLeftInSeconds: number;
}


