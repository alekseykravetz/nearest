import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { DataService } from '../services/data.service';
import { AccountService } from '../services/account.service';
import * as moment from 'moment';
import { IGame } from 'models/game';
import { ISubmition } from 'models/submition';
import { SideBarConfigurationService } from '../services/side-bar-configuration.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  private navigatedGameId: string;
  game: IGame;
  userSubmition: ISubmition;

  constructor(
    private router: ActivatedRoute,
    private location: Location,
    private dataService: DataService,
    public accountService: AccountService,
    private sideBarConfService: SideBarConfigurationService) {
    sideBarConfService.disableAsideContent();
  }

  ngOnInit() {
    this.navigatedGameId = this.router.snapshot.params.id;
    if (this.navigatedGameId) {
      this.dataService.getGameDocRef(this.navigatedGameId).valueChanges().subscribe(game => {
        this.game = game;
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

  ngOnDestroy() {
    this.sideBarConfService.enableAsideContent();
  }

}
