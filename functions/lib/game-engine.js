"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
class GameEngine {
    constructor(gameId, gameDocRef = admin.firestore().doc('games/' + gameId)) {
        this.gameId = gameId;
        this.gameDocRef = gameDocRef;
    }
    startGame() {
        console.log('startGame() - ' + this.gameId);
        let timeLeftInSeconds = 60;
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
        }, 1000);
    }
    endGame() {
        console.log('endGame() - ' + this.gameId);
        const numberToGuess = Math.round(Math.random() * 100 + 1);
        console.log('number to guess: ' + numberToGuess);
        this.getWinner(numberToGuess)
            .then(winner => {
            this.gameDocRef
                .set({
                isEnded: true,
                endDate: Date(),
                numberToGuess: numberToGuess,
                winner: winner
            }, { merge: true })
                .then(doc => {
                console.log('game ended: ' + this.gameId);
            })
                .catch(err => {
                console.log(err);
            });
            if (winner) {
                this.updateWinnerScores(winner);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    getWinner(numberToGuess) {
        console.log('getWinner() - ' + this.gameId);
        return this.gameDocRef.collection('submitions')
            .get()
            .then(submitionsSnap => {
            console.log('submitionsSnap size = ' + submitionsSnap.size);
            let winnerSubmition = null;
            submitionsSnap.forEach(snap => {
                const submition = snap.data();
                if (!winnerSubmition) {
                    winnerSubmition = submition;
                }
                else {
                    const nearstDiff = numberToGuess - winnerSubmition.value;
                    const nextDiff = numberToGuess - submition.value;
                    if (Math.abs(nextDiff) < Math.abs(nearstDiff)) {
                        winnerSubmition = submition;
                    }
                }
            });
            winnerSubmition.points = submitionsSnap.size - 1;
            return Promise.resolve(winnerSubmition);
        })
            .catch(err => {
            return Promise.reject(err);
        });
    }
    updateWinnerScores(winner) {
        console.log('updateWinnerScores() - ' + this.gameId);
        admin.firestore().collection('scores').doc(winner.userId)
            .get()
            .then(snap => {
            if (snap.exists) {
                const userScore = snap.data();
                console.log('userScoreDoc: ' + userScore);
                const userPoints = userScore.points;
                const newPoints = userPoints ? userPoints + winner.points : winner.points;
                snap.ref
                    .set({ points: newPoints }, { merge: true })
                    .catch(err => {
                    console.error(err);
                });
            }
            else {
                console.log('creating new score doc');
                admin.firestore().collection('scores').doc(winner.userId)
                    .set({ points: winner.points })
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
exports.GameEngine = GameEngine;
//# sourceMappingURL=game-engine.js.map