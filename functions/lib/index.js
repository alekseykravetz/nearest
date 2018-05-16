"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const game_engine_1 = require("./game-engine");
const moment = require("moment");
// import { IGame } from 'models/game';
admin.initializeApp();
exports.gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {
    console.log('game created: ' + snap.ref.id);
    new game_engine_1.GameEngine(snap.ref.id).startGame();
    const createMoment = moment();
    const createGameISO = createMoment.toISOString();
    const endGameISO = createMoment.add(1, 'minutes').toISOString();
    return snap.ref.set({
        createDate: createGameISO,
        endDate: endGameISO,
        isEnded: false,
        id: snap.ref.id
    } /* as IGame */, { merge: true });
});
//# sourceMappingURL=index.js.map