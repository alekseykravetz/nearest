import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaders$;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.leaders$ = this.dataService.getLeaderboard();
  }

}
