import { Component, Input } from '@angular/core';
import { ISubmition } from '../models/submition';


@Component({
  selector: 'app-game-submitions',
  templateUrl: './game-submitions.component.html',
  styleUrls: ['./game-submitions.component.css']
})
export class GameSubmitionsComponent {

  @Input() submitions: ISubmition[];

  constructor() { }

}
