import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ISubmition } from 'models/submition';
import { DataService } from '../../../../common/services/data.service';

@Component({
  selector: 'app-home-active-games-game-submitions',
  templateUrl: './submitions.component.html',
  styleUrls: ['./submitions.component.css']
})
export class SubmitionsComponent implements OnInit {

  @Input() gameId: string;
  submitions: ISubmition[];
  @Output() count = new EventEmitter<number>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSubmitions(this.gameId).subscribe(submitions => {
      this.submitions = submitions;
      this.count.emit(this.submitions.length);
    });
  }
}
