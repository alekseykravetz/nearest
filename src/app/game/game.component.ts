import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { DataService } from '../services/data.service';
import { AccountService } from '../services/account.service';
import * as moment from 'moment';
import { IGame } from 'models/game';
import { ISubmition } from 'models/submition';

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
  leftSecondTimer: any;
  gameTimerStarted = false;

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

        if (!this.gameTimerStarted && this.game.endDate) {
          this.gameTimerStarted = true;
          this.startGameTimer(this.game.endDate);
        }
        if (this.game.isEnded) {
          clearInterval(this.leftSecondTimer);
        }
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

  private startGameTimer(endDate: string) {
    const endGameMoment = moment(endDate);
    console.log(endGameMoment.toObject());

    this.leftSecondTimer = setInterval(() => {
      if (endGameMoment.seconds() !== 0) {
        const end = endGameMoment.clone();
        end.subtract(moment().toObject());
        // sync local and firbase server time
        if (end.minutes() === 0) {
          this.timeLeftInSeconds = end.seconds();
        }
      } else {
        clearInterval(this.leftSecondTimer);
      }
    }, 1000);
  }

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
      } as ISubmition);
  }

  goBack(): void {
    this.location.back();
  }

}
