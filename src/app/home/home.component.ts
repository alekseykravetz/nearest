import { AccountService } from './../services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { IGame } from '../models/game';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: User;
  title: string;
  aaa: string;
  constructor(
    private router: Router,
    private dataService: DataService,
    public accountService: AccountService) {
  }
}
