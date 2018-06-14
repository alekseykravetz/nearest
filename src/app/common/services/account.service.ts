import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import * as firebase from 'firebase';


@Injectable()
export class AccountService {

  user$: Observable<User>;
  user: User;

  messaging: firebase.messaging.Messaging;

  constructor(private authService: AngularFireAuth) {
    this.user$ = this.authService.authState;
    this.user$.subscribe(user => {
      this.user = user;
    });

    this.messaging = firebase.messaging();
    this.messaging.requestPermission()
      .then(() => {
        console.log('requestPermission - OK');
        return this.messaging.getToken();
      })
      .then((token) => {
        console.log('getToken - OK');
        console.log('Token: ' + token);
      })
      .catch(err => {
        console.log('requestPermission failed! ' + err);
      });
  }

  login() {
    console.log('AccountService.login()');
    this.authService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    console.log('AccountService.logout()');
    this.authService.auth.signOut();
  }
}
