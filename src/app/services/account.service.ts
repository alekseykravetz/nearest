import { Injectable } from '@angular/core';
import { OnDestroy } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';


@Injectable()
export class AccountService {

  public user: User;
  // private userSub: Subscription;

  constructor(
    private fireAuth: AngularFireAuth) {

    this.fireAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  /*   ngOnDestroy() {
      this.userSub.unsubscribe();
    } */

}
