import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { ISubmition } from 'models/submition';
// import { IGame } from 'models/game';
// import { IUserScore } from 'models/user-score';

export class GameEngine {

    constructor(
        private gameId: string,
        private gameDocRef = admin.firestore().doc('games/' + gameId)) {
    }

    startGame() {
        console.log('startGame() - ' + this.gameId);

        let timeLeftInSeconds = 60;
        const timer = setInterval(() => {
            timeLeftInSeconds--;
            this.gameDocRef
                .set({ timeLeftInSeconds: timeLeftInSeconds }, { merge: true })
                .catch(err => {
                    console.log('startGame() failed: ' + err);
                });

            if (timeLeftInSeconds <= 0) {
                this.endGame();
                clearInterval(timer);
            }
        }, 1000);

        this.addBots();
    }

    addBots() {
        let botNum = 0;
        const botsTimer = setInterval(async () => {
            botNum++;
            try {
                if (botNum < 4) {
                    const subRef = await this.addBot();
                    console.log('Bot submition Id: ' + subRef.id);
                } else {
                    clearInterval(botsTimer);
                }
            } catch (err) {
                console.log('addBots() -> add submition Failed' + err);
            }
        }, 1000 * 15);
    }

    addBot(): Promise<any> /* DocumentReference */ {
        return this.gameDocRef.collection('submitions')
            .add({
                userId: 'bot',
                userDisplayName: 'Bot',
                value: Math.round(Math.random() * 100 + 1),
                photoURL: 'https://cdn-images-1.medium.com/max/1200/1*paQ7E6f2VyTKXHpR-aViFg.png'
            } /* as ISubmition */);
    }

    endGame() {
        console.log('endGame() - ' + this.gameId);

        const numberToGuess = Math.round(Math.random() * 100 + 1);
        console.log('Game Number: ' + numberToGuess);

        this.getWinner(numberToGuess)
            .then(winners => {
                this.gameDocRef
                    .set({
                        isEnded: true,
                        numberToGuess: numberToGuess,
                        winners: winners
                    } /* as IGame */, { merge: true })
                    .then(doc => {
                        console.log('game ended: ' + this.gameId);
                    })
                    .catch(err => {
                        console.log('endGame() - update game doc - failed: ' + err);
                    });

                winners.forEach(w => {
                    if (w.userDisplayName !== 'Bot') {
                        this.updateWinnerScores(w)
                    }
                });
            }).catch(err => {
                console.log('endGame() - getWinner() - failed: ' + err);
            });
    }

    private async getWinner(numberToGuess: number): Promise<any[]/* ISubmition */> {
        console.log('getWinner() - ' + this.gameId);

        try {
            const submitionsSnap = await this.gameDocRef.collection('submitions').get();

            console.log('submitionsSnap size = ' + submitionsSnap.size);

            let winner: any/* ISubmition */ = null;
            let additionalWinnes: any[]/* ISubmition */ = [];
            submitionsSnap.forEach(snap => {
                const next: any/* ISubmition */ = snap.data() /* as ISubmition */;
                if (!winner) {
                    winner = next;
                } else {
                    const winnerDiff = numberToGuess - winner.value;
                    const nextDiff = numberToGuess - next.value;
                    if (Math.abs(nextDiff) < Math.abs(winnerDiff)) {
                        winner = next;
                        additionalWinnes = [];
                    } else if (Math.abs(nextDiff) === Math.abs(winnerDiff)) {
                        additionalWinnes.push(next);
                    }
                }
            });
            let winners;
            if (winner) {
                winners = [winner, ...additionalWinnes];
                winners.forEach(w => {
                    w.points = submitionsSnap.size - 1;
                });
            }
            return Promise.resolve(winners);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    private updateWinnerScores(winner: any/* ISubmition */) {
        console.log('updateWinnerScores() - ' + this.gameId);

        admin.firestore().collection('scores').doc(winner.userId)
            .get()
            .then(snap => {
                if (snap.exists) {
                    const userScore = snap.data() /* as IUserScore */;
                    console.log('userScoreDoc: ' + userScore);
                    const newPoints = userScore.points ? userScore.points + winner.points : winner.points;
                    snap.ref
                        .set({
                            points: newPoints,
                            photoURL: winner.photoURL,
                            displayName: winner.userDisplayName
                        } /* as IUserScore */, { merge: true })
                        .catch(err => {
                            console.error('update scores doc failed: ' + err);
                        });
                } else {
                    console.log('creating new score doc');

                    admin.firestore().collection('scores').doc(winner.userId)
                        .set({
                            points: winner.points,
                            photoURL: winner.photoURL,
                            displayName: winner.userDisplayName
                        } /* as IUserScore */)
                        .catch(err => {
                            console.error('create scores doc failed: ' + err);
                        });
                }
            })
            .catch(err => {
                console.error('updateWinnerScores() - get user scores doc failed: ' + err);
            });
    }
}
