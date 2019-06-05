import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGalleriesPageComponent } from './admin-galleries-page.component';

describe('AdminGalleriesPageComponent', () => {
  let component: AdminGalleriesPageComponent;
  let fixture: ComponentFixture<AdminGalleriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGalleriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGalleriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
