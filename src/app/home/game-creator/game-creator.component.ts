import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { IGame } from '../../models/game';

@Component({
  selector: 'app-home-game-creator',
  templateUrl: './game-creator.component.html',
  styleUrls: ['./game-creator.component.css']
})
export class GameCreatorComponent {

  title: string;

  constructor(
    private router: Router,
    private dataService: DataService) {
  }

  create() {
    const gameId = this.dataService.addNewGame({ title: this.title } as IGame);
    this.title = null;
    this.router.navigate(['/games/' + gameId]);
  }

  quickStart() {
    this.title = 'Quick Start game';
    this.create();
  }
}
