import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '@app/api/services/category.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '@app/api/models/category.model';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import * as _ from 'lodash';

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

  removeCategory(category: Category) {
    const categories = this.control.value as Category[];
    _.remove(categories, category);
    this.control.setValue(categories);
  }

  addCategory(event: MatAutocompleteSelectedEvent) {
    const category: Category = event.option.value;
    if (!_.find(this.control.value, category)) {
      this.control.value.push(category);
      this.control.setValue(this.control.value);
    }

    this.categorySearchControl.setValue('');
  }

}
