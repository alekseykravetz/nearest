import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { ISubmition } from 'models/submition';

@Component({
  selector: 'app-game-submitions',
  templateUrl: './submitions.component.html',
  styleUrls: ['./submitions.component.css']
})
export class SubmitionsComponent implements OnInit {

  @Input() gameId: string;
  submitions: ISubmition[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSubmitions(this.gameId).subscribe(submitions => {
      this.submitions = submitions;
    });
  }
}
