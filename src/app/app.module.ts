import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { UserScoreComponent } from './account/user-score/user-score.component';
import { ActiveGamesComponent } from './home/active-games/active-games.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import { SubmitionsComponent } from './game/submitions/submitions.component';
import { WinnerComponent } from './game/winner/winner.component';
import { GuessSelectorComponent } from './game/guess-selector/guess-selector.component';
import { DataService } from './services/data.service';
import { AccountService } from './services/account.service';
import { GameCreatorComponent } from './home/game-creator/game-creator.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { UserBoxComponent } from './controls/user-box/user-box.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ActiveGamesComponent,
    GameComponent,
    HomeComponent,
    SubmitionsComponent,
    WinnerComponent,
    GuessSelectorComponent,
    UserScoreComponent,
    GameCreatorComponent,
    LeaderboardComponent,
    UserBoxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [DataService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
