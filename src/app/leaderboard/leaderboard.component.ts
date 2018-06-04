import { DataService } from '../common/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUserScore } from 'models/user-score';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaders$: Observable<IUserScore[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.leaders$ = this.dataService.getLeaderboard();
  }
}
