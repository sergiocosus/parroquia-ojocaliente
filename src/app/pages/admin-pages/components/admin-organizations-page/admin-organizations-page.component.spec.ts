import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationsPageComponent } from './admin-organizations-page.component';

describe('AdminOrganizationsPageComponent', () => {
  let component: AdminOrganizationsPageComponent;
  let fixture: ComponentFixture<AdminOrganizationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
