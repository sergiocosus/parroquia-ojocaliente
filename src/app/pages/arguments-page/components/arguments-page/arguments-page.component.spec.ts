import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentsPageComponent } from './arguments-page.component';

describe('ArgumentsPageComponent', () => {
  let component: ArgumentsPageComponent;
  let fixture: ComponentFixture<ArgumentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgumentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
