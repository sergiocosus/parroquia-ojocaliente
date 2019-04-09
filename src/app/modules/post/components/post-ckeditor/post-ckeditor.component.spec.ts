import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCkeditorComponent } from './post-ckeditor.component';

describe('PostCkeditorComponent', () => {
  let component: PostCkeditorComponent;
  let fixture: ComponentFixture<PostCkeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCkeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
