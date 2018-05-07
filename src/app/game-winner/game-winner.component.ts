import { Component, Input } from '@angular/core';
import { IGame } from '../models/game';

@Component({
  selector: 'app-game-winner',
  templateUrl: './game-winner.component.html',
  styleUrls: ['./game-winner.component.css']
})
export class GameWinnerComponent {
  @Input() game: IGame;
}
