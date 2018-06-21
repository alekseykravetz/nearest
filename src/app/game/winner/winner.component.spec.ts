import { WinnerComponent } from './winner.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from './../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { IGame } from 'models/game';
import { DataService } from './../../common/services/data.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ISubmition } from 'models/submition';

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
      createDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      winner: {
        userDisplayName: 'Ran',
        photoURL: '',
        userId: 'userId',
        value: 10,
        points: 5
      } as ISubmition,
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
