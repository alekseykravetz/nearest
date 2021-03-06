import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
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
  MatCheckboxModule,
} from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { CommonModule } from './common/common.module';

import { AppComponent } from './app.component';

import { AccountComponent } from './account/account.component';
import { UserScoreComponent } from './account/user-score/user-score.component';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';

import { HomeComponent } from './home/home.component';
import { GameCreatorComponent } from './home/game-creator/game-creator.component';
import { ActiveGamesComponent } from './home/active-games/active-games.component';
import { GameComponent as ActiveGameComponent } from './home/active-games/game/game.component';
import { SubmitionsComponent as ActiveGameSubmitionsComponent } from './home/active-games/game/submitions/submitions.component';

import { GameComponent } from './game/game.component';
import { GuessSelectorComponent } from './game/guess-selector/guess-selector.component';
import { SubmitionsComponent as GameSubmitionsComponent } from './game/submitions/submitions.component';
import { WinnerComponent } from './game/winner/winner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ActiveGamesComponent,
    GameComponent,
    ActiveGameComponent,
    HomeComponent,
    GameSubmitionsComponent,
    ActiveGameSubmitionsComponent,
    WinnerComponent,
    GuessSelectorComponent,
    UserScoreComponent,
    GameCreatorComponent,
    LeaderboardComponent,
    NotFoundComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,
    CommonModule,

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
    MatCheckboxModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
