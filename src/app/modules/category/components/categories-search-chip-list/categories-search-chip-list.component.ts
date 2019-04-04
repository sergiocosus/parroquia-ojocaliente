import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '@app/api/services/category.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '@app/api/models/category.model';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-categories-search-chip-list',
  templateUrl: './categories-search-chip-list.component.html',
  styleUrls: ['./categories-search-chip-list.component.scss']
})
export class CategoriesSearchChipListComponent implements OnInit {
  @Input() control: FormControl;
  $filteredCategories: Observable<Category[]>;
  categorySearchControl = new FormControl();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.$filteredCategories = this.categorySearchControl.valueChanges.pipe(
      mergeMap(search => this.categoryService.get({search}))
    );
  }

  get categoriesForm() {
    return this.control;
  }

  removeCategory(category: Category) {
    const categories = this.categoriesForm.value as Category[];
    categories.splice(categories.indexOf(category), 1);
  }

  addCategory(event: MatAutocompleteSelectedEvent) {
    const category: Category = event.option.value;
    this.categoriesForm.value.push(category);
    this.categorySearchControl.setValue('');
  }

}
