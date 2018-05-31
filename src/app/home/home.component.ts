import { AccountService } from './../services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, OnDestroy, enableProdMode } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { IGame } from 'models/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  activeGames: IGame[];

  constructor(
    private router: Router,
    private dataService: DataService,
    public accountService: AccountService) {
  }

  ngOnInit() {
    this.getActiveGames();
  }

  private getActiveGames() {
    this.subscription = this.dataService.getActiveGamesCollectionRef().valueChanges().subscribe(activeGames => {
      this.activeGames = activeGames;
    });
  }

  createGame(title: string) {
    const gameId = this.dataService.addNewGame({ title: title } as IGame);
    this.router.navigate(['/games/' + gameId]);
  }

  quickStartGame() {
    if (this.activeGames.length > 0) {
      this.router.navigate(['/games/' + this.activeGames[0].id]);
    } else {
      this.createGame('Quick');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
