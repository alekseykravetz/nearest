"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const game_engine_1 = require("./game-engine");
admin.initializeApp();
exports.gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {
    console.log('game created: ' + snap.ref.id);
    new game_engine_1.GameEngine(snap.ref.id).startGame();
    return snap.ref.set({
        createDate: Date(),
        isEnded: false,
        id: snap.ref.id
    }, { merge: true });
});
//# sourceMappingURL=index.js.map