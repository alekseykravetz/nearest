"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
class GameEngine {
    constructor(gameId) {
        this.gameId = gameId;
    }
    endGame() {
        const numberToGuess = Math.round(Math.random() * 100 + 1);
        console.log('number to guess: ' + numberToGuess);
        this.getWinner(numberToGuess).then(winner => {
            admin.firestore().doc('games/' + this.gameId)
                .set({
                isEnded: true,
                endDate: Date(),
                numberToGuess: numberToGuess,
                winner: winner
            }, { merge: true })
                .then(doc => {
                console.log('game ended' + doc);
            })
                .catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }
    getWinner(numberToGuess) {
        return admin.firestore().collection('games/' + this.gameId + '/submitions').get()
            .then(submitionsSnap => {
            let winnerSubmition;
            submitionsSnap.forEach(submitionSnap => {
                const submition = submitionSnap.data();
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
            return Promise.resolve(winnerSubmition);
        }).catch(err => {
            return Promise.reject(err);
        });
    }
}
exports.GameEngine = GameEngine;
//# sourceMappingURL=game-engine.js.map