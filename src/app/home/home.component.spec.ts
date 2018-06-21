import { HomeComponent } from './home.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from './../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { DataService } from '../common/services/data.service';
import { IGame } from 'models/game';

fdescribe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    component.accountService.user = {
      displayName: 'test user'
    } as User;

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
