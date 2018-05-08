import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitionsComponent } from './submitions.component';


describe('SubmitionsComponent', () => {
  let component: SubmitionsComponent;
  let fixture: ComponentFixture<SubmitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
