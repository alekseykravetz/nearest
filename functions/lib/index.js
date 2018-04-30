"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const game_engine_1 = require("./game-engine");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
exports.gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {
    const game = Object.assign(snap.data(), {
        createDate: Date(),
        isEnded: false,
        id: snap.ref.id
    });
    const gameDocRef = admin.firestore().doc('games/' + snap.ref.id);
    gameDocRef.set(game);
    let timerInterval;
    let timeLeftInSeconds = 60;
    timerInterval = setInterval(() => {
        timeLeftInSeconds--;
        gameDocRef.set({ timeLeftInSeconds: timeLeftInSeconds }, { merge: true });
        if (timeLeftInSeconds <= 0) {
            new game_engine_1.GameEngine(snap.ref.id).endGame();
            clearInterval(timerInterval);
        }
    }, 1000);
});
//# sourceMappingURL=index.js.map