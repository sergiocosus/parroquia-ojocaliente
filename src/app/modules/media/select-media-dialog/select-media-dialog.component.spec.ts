import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMediaDialogComponent } from './select-media-dialog.component';

describe('SelectMediaDialogComponent', () => {
  let component: SelectMediaDialogComponent;
  let fixture: ComponentFixture<SelectMediaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMediaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
