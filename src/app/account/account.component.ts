import { IUserScore } from './../models/user-score';
import { DataService } from './../srvices/data.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  user: User;
  score$: Observable<IUserScore>;

  constructor(
    private authService: AngularFireAuth,
    private dataService: DataService) {

    this.authService.authState.subscribe(user => {
      this.user = user;
      console.log(this.user);

      if (this.user !== null) {
        this.score$ = dataService.getUserScoreDocRef(this.user.uid).valueChanges();
      }

    });
  }

  doLogin() {
    console.log('AccountComponent.doLogin()');
    this.authService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  doLogout() {
    console.log('AccountComponent.doLogout()');
    this.authService.auth.signOut();
  }

}
