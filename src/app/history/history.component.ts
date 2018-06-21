import { IGame } from 'models/game';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { Observable } from 'rxjs';
import { AccountService } from '../common/services/account.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  games$: Observable<IGame[]>;
  games: IGame[];

  constructor(private dataService: DataService,
    public accountService: AccountService) {
  }

  ngOnInit() {
    if (this.accountService.user !== null) {
      this.games$ = this.dataService.getUserGamesHistory(this.accountService.user.uid);

      this.dataService.getUserGamesHistory(this.accountService.user.uid).subscribe(games => {
        this.games = games;
      });
    }
  }

}
