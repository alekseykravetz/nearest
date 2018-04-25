export interface IGame {
    id: string;
    title: string;
    createDate: Date;
    endDate: Date;
    isEnded: boolean;
    numberToGuess?: number;
    winner: {
        name: string;
        guessedValue: number;
    };
}


