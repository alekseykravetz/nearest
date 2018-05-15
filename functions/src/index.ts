import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GameEngine } from './game-engine';
import * as moment from 'moment';


admin.initializeApp();


export const gameCreated = functions.firestore.document('games/{gameId}').onCreate(snap => {

    console.log('game created: ' + snap.ref.id);
    
    new GameEngine(snap.ref.id).startGame();

    const createMoment = moment();
    const createGameISO = createMoment.toISOString();
    const endGameISO = createMoment.add(1, 'minutes').toISOString();

    return snap.ref.set({
        createDate: createGameISO,
        endDate: endGameISO,
        isEnded: false,
        id: snap.ref.id
    }, { merge: true });
});
