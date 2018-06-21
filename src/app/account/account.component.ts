import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../common/services/data.service';
import { AccountService } from '../common/services/account.service';
import { User } from 'firebase';

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
