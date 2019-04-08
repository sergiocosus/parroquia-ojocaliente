import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaThumbComponent } from './media-thumb.component';

describe('MediaThumbComponent', () => {
  let component: MediaThumbComponent;
  let fixture: ComponentFixture<MediaThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
