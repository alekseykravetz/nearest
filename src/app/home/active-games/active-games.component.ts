import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IGame } from 'models/game';

@Component({
  selector: 'app-home-active-games',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveGamesComponent {

  @Input() games: IGame[];

  trackById(index, game) {
    return game.id;
  }
}
