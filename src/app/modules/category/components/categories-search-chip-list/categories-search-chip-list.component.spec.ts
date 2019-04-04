import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSearchChipListComponent } from './categories-search-chip-list.component';

describe('CategoriesSearchChipListComponent', () => {
  let component: CategoriesSearchChipListComponent;
  let fixture: ComponentFixture<CategoriesSearchChipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesSearchChipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSearchChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
