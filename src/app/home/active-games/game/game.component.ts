import { Component, OnInit, Input } from '@angular/core';
import { IGame } from 'models/game';

@Component({
  selector: 'app-home-active-games-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game: IGame;
  submitionsCount: number;

  constructor() { }

  ngOnInit() {
  }

}
