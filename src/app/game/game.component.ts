import { DataService } from './../srvices/data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuth, User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IGame } from '../models/game';
import { ISubmition } from '../models/submition';
import * as moment from 'moment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private gameId: string;
  game: IGame;
  submitions$: Observable<ISubmition[]>;
  user: User;
  userSubmition: ISubmition = {
    userDisplayName: null,
    userId: null,
    photoURL: null,
    value: null,
  };

  constructor(
    private router: ActivatedRoute,
    private db: AngularFirestore,
    private authService: AngularFireAuth,
    private location: Location,
    private dataService: DataService) {

    this.authService.authState.subscribe(state => {
      console.log('GameComponent.authService.authState.subscribe()');
      this.user = state;
      this.userSubmition.userId = state.uid;
      this.userSubmition.userDisplayName = state.displayName;
      this.userSubmition.photoURL = state.photoURL;
      if (this.user) {
        this.getUserSubmition();
      }
    });
  }

  ngOnInit() {
    this.gameId = this.router.snapshot.params.id;
    if (this.gameId) {
      this.dataService.getGameDocRef(this.gameId).valueChanges().subscribe(game => {
        console.log('GameComponent.authService.authState.subscribe()');
        this.game = game;
      });

      this.submitions$ = this.dataService.getGameSubmitionsCollectionRef(this.gameId).valueChanges();

      if (this.user) {
        this.getUserSubmition();
      }
    }
  }

  private getUserSubmition() {

    this.dataService.getGameUserSubmitionCollectionRef(this.gameId, this.user.uid).valueChanges().subscribe(sub => {
      if (sub[0]) {
        this.userSubmition = sub[0];
      }
    });
  }

  guessSelected(selected: number) {
    this.userSubmition.value = selected;
    this.dataService.getGameSubmitionsCollectionRef(this.gameId).add(this.userSubmition);
  }

  goBack(): void {
    this.location.back();
  }

}
