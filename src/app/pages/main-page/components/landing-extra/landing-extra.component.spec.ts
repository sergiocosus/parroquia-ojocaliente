import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingExtraComponent } from './landing-extra.component';

describe('LandingExtraComponent', () => {
  let component: LandingExtraComponent;
  let fixture: ComponentFixture<LandingExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
