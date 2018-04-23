import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(
    public accountService: AccountService) {
  }

  doLogin() {
    this.accountService.login();
  }

  doLogout() {
    this.accountService.logout();
  }

}
