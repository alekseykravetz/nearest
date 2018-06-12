import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GameEngine } from './game-engine';
import * as moment from 'moment';
// import { IGame } from 'models/game';

const cors = require('cors')({
    origin: true,
});

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
    } /* as IGame */, { merge: true });
});

export const addBot = functions.https.onRequest((req, res) => {
    const gameId = req.body;
    console.log('req.body [gameId]: ' + gameId);

    new GameEngine(gameId).addBot()
        .then(docRef => {
            console.log(docRef.id);

            return cors(req, res, () => {
                res.status(200).send(true);
            });
        })
        .catch(err => {
            console.log(err);

            return cors(req, res, () => {
                res.status(403).send(false);
            });
        })
});
