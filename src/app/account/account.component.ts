import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../services/data.service';
import { AccountService } from './../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnDestroy {

  user: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    public accountService: AccountService) {

    this.subscription = this.accountService.user$.subscribe(user => {
      this.user = user;
      if (this.user === null) {
        this.doLogout();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  doLogin() {
    this.accountService.login();
  }

  doLogout() {
    this.accountService.logout();
    this.router.navigate(['']);
  }
}
