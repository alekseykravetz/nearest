import {  RouterTestingModule } from '@angular/router/testing';
import { IGame } from './../../models/game';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveGamesComponent } from './active-games.component';
import { MatCardModule, MatListModule } from '@angular/material';
import { DebugElement, Component, ChangeDetectionStrategy } from '@angular/core';

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
      declarations: [ActiveGamesComponent],
      imports: [MatCardModule, MatListModule, RouterTestingModule ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show active games', () => {
    component.games = [
      { title: 'test title 1' } as IGame,
      { title: 'test title 1' } as IGame
    ];
    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement;
    const nativeElement: HTMLElement = debugElement.nativeElement;
    console.log(fixture);

    expect(nativeElement.querySelector('a').innerHTML).toBe('test title 1 - ');
  });
});
