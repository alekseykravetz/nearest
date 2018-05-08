import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGame } from '../../models/game';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-home-active-games',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.css']
})
export class ActiveGamesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  games: IGame[];

  constructor(
    private dataService: DataService) {
  }

  ngOnInit() {
    this.subscription = this.dataService.getActiveGamesCollectionRef().valueChanges().subscribe(activeGames => {
      this.games = activeGames;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackById(index, game) {
    return game.id;
  }
}
