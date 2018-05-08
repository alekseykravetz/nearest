import { Component, Input } from '@angular/core';
import { IGame } from '../../models/game';

@Component({
  selector: 'app-game-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent {
  @Input() game: IGame;
}
