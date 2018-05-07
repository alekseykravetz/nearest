import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-guess-selector',
  templateUrl: './guess-selector.component.html',
  styleUrls: ['./guess-selector.component.css']
})
export class GuessSelectorComponent {

  selected: number;
  @Output() guessSubmitted = new EventEmitter<number>();
  @Input() submitDisabled: boolean;

  submit() {
    this.guessSubmitted.emit(this.selected);
  }
}
