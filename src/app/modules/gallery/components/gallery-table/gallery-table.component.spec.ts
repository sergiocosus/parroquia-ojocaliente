import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryTableComponent } from './gallery-table.component';

describe('GalleryTableComponent', () => {
  let component: GalleryTableComponent;
  let fixture: ComponentFixture<GalleryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
