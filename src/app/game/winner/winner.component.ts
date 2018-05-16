import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IGame } from 'models/game';

@Component({
  selector: 'app-game-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnerComponent {
  @Input() game: IGame;
}
