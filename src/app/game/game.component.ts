import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { IGame } from '../models/game';
import { ISubmition } from '../models/submition';
import { DataService } from '../services/data.service';
import { AccountService } from '../services/account.service';
import * as moment from 'moment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private navigatedGameId: string;
  game: IGame;
  userSubmition: ISubmition;
  timeLeftInSeconds: number;
  // leftSecondTimer: any;

  constructor(
    private router: ActivatedRoute,
    private location: Location,
    private dataService: DataService,
    public accountService: AccountService) {
  }

  ngOnInit() {
    this.navigatedGameId = this.router.snapshot.params.id;
    if (this.navigatedGameId) {
      this.dataService.getGameDocRef(this.navigatedGameId).valueChanges().subscribe(game => {
        this.game = game;

        /* if (!this.leftSecondTimer && this.game.createDate) {
          this.startGameTimer(this.game.createDate);
        }
        if (this.game.isEnded) {
          clearInterval(this.leftSecondTimer);
        } */
      });

      if (this.accountService.user) {
        this.getUserSubmition();
      } else {
        this.accountService.user$.subscribe(user => {
          if (user) {
            this.getUserSubmition();
          }
        });
      }
    }
  }

  /* private startGameTimer(createDate: string) {
    const gameSec = new Date(createDate).getSeconds();
    const gameEndSec = gameSec + 60;

    this.leftSecondTimer = setInterval(() => {
      const nowSec = new Date().getSeconds();
      this.timeLeftInSeconds = gameEndSec - nowSec;
    }, 1000);
  } */

  private getUserSubmition() {
    this.dataService.getGameUserSubmitionCollectionRef(this.navigatedGameId, this.accountService.user.uid).valueChanges()
      .subscribe(sub => {
        this.userSubmition = sub[0];
      });
  }

  guessSelected(selected: number) {
    this.dataService.getGameSubmitionsCollectionRef(this.navigatedGameId)
      .add({
        userDisplayName: this.accountService.user.displayName,
        userId: this.accountService.user.uid,
        photoURL: this.accountService.user.photoURL,
        value: selected,
      });
  }

  goBack(): void {
    this.location.back();
  }

}
