import { WinnerComponent } from './winner.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from './../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '@firebase/auth-types';
import { IGame } from '../../models/game';
import { DataService } from './../../services/data.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show winner', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#winner-label').innerHTML).toBe('Ran');
  });
});
