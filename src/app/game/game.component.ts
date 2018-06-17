import { addBot } from './../../../functions/src/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { DataService } from '../common/services/data.service';
import { AccountService } from '../common/services/account.service';
import * as moment from 'moment';
import { IGame } from 'models/game';
import { ISubmition } from 'models/submition';
import { SideBarConfigurationService } from '../common/services/side-bar-configuration.service';
import { IAdditionalButton } from '../../../models/additional-button';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  private get navigatedGameId() {
    return this.router.snapshot.params.id;
  }

  game: IGame;
  userSubmition: ISubmition;

  constructor(
    private router: ActivatedRoute,
    private location: Location,
    private dataService: DataService,
    public accountService: AccountService,
    private sideBarConfService: SideBarConfigurationService,
    private http: HttpClient) {

    sideBarConfService.disableAsideContent();
    sideBarConfService.changeAdditionalButtons([{
      iconClass: 'fab fa-android',
      action: this.addBot,
      actionContext: this // todo: remove actionContext
    }] as IAdditionalButton[]);
  }

  ngOnInit() {
    if (this.navigatedGameId) {
      this.dataService.getGame(this.navigatedGameId).subscribe(game => {
        this.game = game;
      });
      this.getUserSubmition();
    }
  }

  private getUserSubmition() {
    this.dataService.getUserSubmitions(this.navigatedGameId, this.accountService.user.uid)
      .subscribe(sub => {
        this.userSubmition = sub[0];
      });
  }

  guessSelected(selected: number) {
    this.dataService.addGameSubmition(this.navigatedGameId, {
      userDisplayName: this.accountService.user.displayName,
      userId: this.accountService.user.uid,
      photoURL: this.accountService.user.photoURL,
      value: selected,
    } as ISubmition);
  }

  addBot() {
    this.http.post<string>('https://us-central1-alex-nearest.cloudfunctions.net/addBot', this.navigatedGameId)
      .subscribe(value => {
        console.log('Requested bot submition: ' + value);
      });
  }

  ngOnDestroy() {
    this.sideBarConfService.enableAsideContent();
    this.sideBarConfService.changeAdditionalButtons([]);
  }
}
