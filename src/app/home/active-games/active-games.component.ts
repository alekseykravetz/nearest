import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IGame } from '../../models/game';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-home-active-games',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveGamesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  games: IGame[];

  constructor(
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subscription = this.dataService.getActiveGamesCollectionRef().valueChanges().subscribe(activeGames => {
      this.games = activeGames;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackById(index, game) {
    return game.id;
  }
}
