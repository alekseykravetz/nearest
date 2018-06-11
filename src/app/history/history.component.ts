import { IGame } from 'models/game';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  games$: Observable<IGame[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.games$ = this.dataService.getAllGames();
  }

}
