import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSocialLinksComponent } from './organization-social-links.component';

describe('OrganizationElementComponent', () => {
  let component: OrganizationSocialLinksComponent;
  let fixture: ComponentFixture<OrganizationSocialLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSocialLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
