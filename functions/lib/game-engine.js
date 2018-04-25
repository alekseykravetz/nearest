"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
class GameEngine {
    constructor(gameId) {
        this.gameId = gameId;
    }
    endGame() {
        const numberToGuess = Math.round(Math.random() * 100 + 1);
        this.getWinner(numberToGuess).then(winner => {
            admin.firestore().doc('games/' + this.gameId).set({
                isEnded: true,
                endDate: Date(),
                numberToGuess: numberToGuess,
                winner: winner
            }, {
                merge: true
            }).then()
                .catch();
        }).catch(err => {
            console.log(err);
        });
    }
    getWinner(numberToGuess) {
        return admin.firestore().collection('games/' + this.gameId + '/submitions').get()
            .then(submitions => {
            const result = {
                guessedValue: null,
                name: ''
            };
            submitions.forEach(submitionSnap => {
                const submition = submitionSnap.data();
                console.log(submition);
                console.log(numberToGuess);
                if (!result.guessedValue) {
                    result.guessedValue = submition.value;
                    result.name = submition.userDisplayName;
                }
                else {
                    const nearstDiff = numberToGuess - result.guessedValue;
                    const diff = numberToGuess - submition.value;
                    if (Math.abs(diff) < Math.abs(nearstDiff)) {
                        result.guessedValue = submition.value;
                        result.name = submition.userDisplayName;
                    }
                }
            });
            return Promise.resolve(result);
        }).catch(err => {
            return Promise.reject(err);
        });
    }
}
exports.GameEngine = GameEngine;
//# sourceMappingURL=game-engine.js.map