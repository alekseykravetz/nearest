import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSubmitionsComponent } from './game-submitions.component';

describe('GameSubmitionsComponent', () => {
  let component: GameSubmitionsComponent;
  let fixture: ComponentFixture<GameSubmitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSubmitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSubmitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
