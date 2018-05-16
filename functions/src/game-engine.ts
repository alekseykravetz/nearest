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

        const timer = setTimeout(() => {
            this.endGame();
            clearTimeout(timer);
        }, 1000 * 60);


        /* let timeLeftInSeconds = 60;
        const timer = setInterval(() => {
            timeLeftInSeconds--;
            this.gameDocRef
                .set({ timeLeftInSeconds: timeLeftInSeconds }, { merge: true })
                .catch(err => {
                    console.log(err);
                });

            if (timeLeftInSeconds <= 0) {
                this.endGame();
                clearInterval(timer);
            }
        }, 1000); */
    }

    endGame() {
        console.log('endGame() - ' + this.gameId);

        const numberToGuess = Math.round(Math.random() * 100 + 1);
        console.log('number to guess: ' + numberToGuess);

        this.getWinner(numberToGuess).then(winner => {
            this.gameDocRef
                .set({
                    isEnded: true,
                    numberToGuess: numberToGuess,
                    winner: winner
                } /* as IGame */, { merge: true })
                .then(doc => {
                    console.log('game ended: ' + this.gameId);
                })
                .catch(err => {
                    console.log(err);
                });

            if (winner) {
                this.updateWinnerScores(winner)
            }
        }).catch(err => {
            console.log(err);
        });
    }

    private getWinner(numberToGuess: number): Promise<any/* ISubmition */> {
        console.log('getWinner() - ' + this.gameId);

        return this.gameDocRef.collection('submitions')
            .get()
            .then(submitionsSnap => {
                console.log('submitionsSnap size = ' + submitionsSnap.size);

                let winner: any/* ISubmition */ = null;
                submitionsSnap.forEach(snap => {
                    const next: any/* ISubmition */ = snap.data() /* as ISubmition */;
                    if (!winner) {
                        winner = next;
                    } else {
                        const winnerDiff = numberToGuess - winner.value;
                        const nextDiff = numberToGuess - next.value;
                        if (Math.abs(nextDiff) < Math.abs(winnerDiff)) {
                            winner = next;
                        }
                    }
                });
                if (winner) {
                    winner.points = submitionsSnap.size - 1;
                }
                return Promise.resolve(winner);
            })
            .catch(err => {
                return Promise.reject(err);
            });
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
                            console.error(err);
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
                            console.error(err);
                        });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
}
