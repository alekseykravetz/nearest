import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { DataService } from './../services/data.service';
import { AppModule } from './../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '@firebase/auth-types';
import { IGame } from '../models/game';
import { By } from '@angular/platform-browser';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataServiceInstance: DataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.accountService.user = {
      displayName: 'test user'
    } as User;
    dataServiceInstance = fixture.debugElement.injector.get(DataService);
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.activeGames = [
        { title: 'game 1', } as IGame,
        { title: 'game 2', } as IGame
      ];
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show active games', () => {
    const activeGamesLinks = fixture.debugElement.nativeElement.querySelectorAll('.active-game-link');
    expect(activeGamesLinks.length).toBe(2);
  });
});
