import { Component, OnInit, Input } from '@angular/core';
import { IGame } from '../models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @Input() games: IGame[];

  constructor() { }

  ngOnInit() {
  }

  trackById(index, game) {
    return game.id;
  }

}
