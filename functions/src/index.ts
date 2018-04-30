import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GameEngine } from './game-engine';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript



admin.initializeApp();

export const gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {
    const game = Object.assign(snap.data(), {
        createDate: Date(),
        isEnded: false,
        id: snap.ref.id
    });

    const gameDocRef = admin.firestore().doc('games/' + snap.ref.id);

    gameDocRef.set(game);

    let timerInterval: any;    
    let timeLeftInSeconds = 60;
    timerInterval = setInterval(() => {
        timeLeftInSeconds--;
        gameDocRef.set({ timeLeftInSeconds: timeLeftInSeconds }, { merge: true });
        if (timeLeftInSeconds <= 0) {
            new GameEngine(snap.ref.id).endGame();
            clearInterval(timerInterval);
        }
    }, 1000);
});



