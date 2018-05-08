import { IGame } from './../../models/game';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatCardModule } from '@angular/material';

import { WinnerComponent } from './winner.component';
import { By } from '@angular/platform-browser';
import { DebugElement, ChangeDetectionStrategy, Component } from '@angular/core';



fdescribe('GameWinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;

  beforeEach(async(() => {
    TestBed.overrideComponent(WinnerComponent, {
      set: new Component({
        selector: 'app-game-winner',
        templateUrl: './winner.component.html',
        styleUrls: ['./winner.component.css'],
        changeDetection: ChangeDetectionStrategy.Default,
      })
    });
    TestBed.configureTestingModule({
      declarations: [WinnerComponent],
      imports: [MatToolbarModule, MatCardModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show winner', () => {
    component.game = {
      id: 'mock game',
      createDate: new Date(),
      winner: {
        userDisplayName: 'Ran',
        photoURL: ''
      },
      isEnded: false,
      timeLeftInSeconds: 60,
      title: 'xxx',
    } as IGame;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement;
    const nativeElement: HTMLElement = debugElement.nativeElement;
    expect(nativeElement.querySelector('#winner-label').innerHTML).toBe('Ran');
  });
});
