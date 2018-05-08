import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessSelectorComponent } from './guess-selector.component';

describe('GuessSelectorComponent', () => {
  let component: GuessSelectorComponent;
  let fixture: ComponentFixture<GuessSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
