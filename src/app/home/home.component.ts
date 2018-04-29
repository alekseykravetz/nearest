import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { IGame } from '../models/game';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  activeGames$: Observable<IGame[]>;
  title: string;

  constructor(
    private db: AngularFirestore,
    public authService: AngularFireAuth,
    private router: Router) {

    this.authService.authState.subscribe(state => {
      this.user = state;
    });
  }

  ngOnInit() {
    this.activeGames$ = this.db.collection<IGame>('games', ref =>
      ref.where('isEnded', '==', false)).valueChanges();
  }

  create() {
    const gameId = this.db.createId();
    this.db.collection('games').doc(gameId).set({ title: this.title });
    this.title = null;

    this.router.navigate(['/games/' + gameId]);
  }
}
