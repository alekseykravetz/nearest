import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import * as firebase from 'firebase/app';


@Injectable()
export class AccountService {

  user$: Observable<User>;
  user: User;

  constructor(private authService: AngularFireAuth) {
    this.user$ = this.authService.authState;
    this.user$.subscribe(user => {
      this.user = user;
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
