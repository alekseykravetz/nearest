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

  constructor(
    private authService: AngularFireAuth) {

    this.authService.authState.subscribe(user => {
      this.user = user;
      console.log(this.user);
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
