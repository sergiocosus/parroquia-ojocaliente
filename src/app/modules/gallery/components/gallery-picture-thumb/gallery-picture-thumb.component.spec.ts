import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPictureThumbComponent } from './gallery-picture-thumb.component';

describe('GalleryPictureThumbComponent', () => {
  let component: GalleryPictureThumbComponent;
  let fixture: ComponentFixture<GalleryPictureThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPictureThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPictureThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
