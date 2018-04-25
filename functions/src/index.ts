import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GameEngine } from './game-engine';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript



admin.initializeApp();

export const gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {
    const snapData = snap.data();
    const objToUpdate = Object.assign(snapData, {
        createDate: Date(),
        isEnded: false,
        id: snap.ref.id
    });

    const gameEngine = new GameEngine(snap.ref.id);

    admin.firestore().doc('games/' + snap.ref.id).set(objToUpdate);
    setTimeout(() => {
        gameEngine.endGame();
    }, 60000)
});



