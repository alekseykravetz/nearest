"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const game_engine_1 = require("./game-engine");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
exports.gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {
    const snapData = snap.data();
    const objToUpdate = Object.assign(snapData, {
        createDate: Date(),
        isEnded: false,
        id: snap.ref.id
    });
    const gameEngine = new game_engine_1.GameEngine(snap.ref.id);
    admin.firestore().doc('games/' + snap.ref.id).set(objToUpdate);
    setTimeout(() => {
        gameEngine.endGame();
    }, 60000);
});
//# sourceMappingURL=index.js.map