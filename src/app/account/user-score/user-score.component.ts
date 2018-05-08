import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUserScore } from '../../models/user-score';
import { DataService } from '../../services/data.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.css']
})
export class UserScoreComponent implements OnInit {

  score$: Observable<IUserScore>;

  constructor(
    private dataService: DataService,
    public accountService: AccountService) {
  }

  ngOnInit() {
    if (this.accountService.user !== null) {
      this.score$ = this.dataService.getUserScoreDocRef(this.accountService.user.uid).valueChanges();
    }
  }

}
