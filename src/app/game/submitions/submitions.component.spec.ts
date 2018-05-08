import { DataService } from './../../services/data.service';
import { ISubmition } from './../../models/submition';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitionsComponent } from './submitions.component';
import { DebugElement } from '@angular/core';
import { MatToolbarModule, MatCardModule, MatListModule } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';


fdescribe('SubmitionsComponent', () => {
  let component: SubmitionsComponent;
  let fixture: ComponentFixture<SubmitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitionsComponent],
      imports: [MatToolbarModule, MatCardModule, MatListModule],
      providers: [DataService, AngularFirestore]
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

  it('should show submitions', () => {

    component.submitions = [
      { userDisplayName: 'Test User DisplayName 1' } as ISubmition,
      { userDisplayName: 'Test User DisplayName 2' } as ISubmition,
    ];

    // fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement;
    const nativeElement: HTMLElement = debugElement.nativeElement;
    console.log(nativeElement.innerHTML);

    expect(nativeElement.innerHTML).toBeTruthy();

  });

});
