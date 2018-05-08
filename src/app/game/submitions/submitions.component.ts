import { Component, Input, OnInit } from '@angular/core';
import { ISubmition } from '../../models/submition';
import { DataService } from '../../services/data.service';

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
    this.dataService.getGameSubmitionsCollectionRef(this.gameId).valueChanges().subscribe(submitions => {
      this.submitions = submitions;
    });
  }
}
