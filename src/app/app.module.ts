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
} from '@angular/material';



import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';



@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    GamesComponent,
    GameComponent,
    HomeComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
