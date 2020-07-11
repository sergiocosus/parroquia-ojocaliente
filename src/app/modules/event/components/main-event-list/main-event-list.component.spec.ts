import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEventListComponent } from './main-event-list.component';

describe('MainEventListComponent', () => {
  let component: MainEventListComponent;
  let fixture: ComponentFixture<MainEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
