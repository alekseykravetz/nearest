import { ActiveGamesComponent } from './active-games.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from './../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '@firebase/auth-types';
import { DataService } from '../../common/services/data.service';
import { RouterTestingModule } from '@angular/router/testing';

import { MatCardModule, MatListModule } from '@angular/material';
import { DebugElement, Component, ChangeDetectionStrategy } from '@angular/core';
import { IGame } from 'models/game';

fdescribe('GamesComponent', () => {
  let component: ActiveGamesComponent;
  let fixture: ComponentFixture<ActiveGamesComponent>;

  beforeEach(async(() => {
    TestBed.overrideComponent(ActiveGamesComponent, {
      set: new Component({
        selector: 'app-home-active-games',
        templateUrl: './active-games.component.html',
        styleUrls: ['./active-games.component.css'],
        changeDetection: ChangeDetectionStrategy.Default,
      })
    });

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveGamesComponent);
    component = fixture.componentInstance;

    component.games = [
      { title: 'test title 1' } as IGame,
      { title: 'test title 1' } as IGame
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show active games', () => {
    expect(fixture.debugElement.nativeElement.querySelector('a').innerHTML).toBe('test title 1 - ');
  });
});
