import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GameEngine } from './game-engine';


admin.initializeApp();


export const gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {

    console.log('game created: ' + snap.ref.id);
    
    new GameEngine(snap.ref.id).startGame();

    return snap.ref.set({
        createDate: Date(),
        isEnded: false,
        id: snap.ref.id
    }, { merge: true });
});
