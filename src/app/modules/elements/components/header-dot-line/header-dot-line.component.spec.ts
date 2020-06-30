import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDotLineComponent } from './header-dot-line.component';

describe('HeaderDotLineComponent', () => {
  let component: HeaderDotLineComponent;
  let fixture: ComponentFixture<HeaderDotLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDotLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDotLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
