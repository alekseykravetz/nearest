import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-game-creator',
  templateUrl: './game-creator.component.html',
  styleUrls: ['./game-creator.component.css']
})
export class GameCreatorComponent {

  @Output() createGame = new EventEmitter<string>();
  @Output() quickStartGame = new EventEmitter();
  title: string;

  create() {
    this.createGame.emit(this.title);
    this.title = null;
  }

  quickStart() {
    this.quickStartGame.emit();
  }
}
