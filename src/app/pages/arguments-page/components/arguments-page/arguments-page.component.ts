import { Component, OnInit } from '@angular/core';
import { ArgumentService } from '@app/api/services/argument.service';
import { Argument } from '@app/api/models/argument.model';
import { CategoryService } from '@app/api/services/category.service';
import { Category } from '@app/api/models/category.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-arguments-page',
  templateUrl: './arguments-page.component.html',
  styleUrls: ['./arguments-page.component.scss']
})
export class ArgumentsPageComponent implements OnInit {
  arguments: Argument[];
  category: Category;
  searchControl = new FormControl();

  constructor(private argumentService: ArgumentService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe(value => {
      this.loadArguments(value);
    });

    this.loadArguments();

    this.categoryService.getOne('argumentacion').subscribe(
      category => this.category = category
    );
  }

  private loadArguments(search?: string) {
    this.argumentService.get(null, null, {search}).subscribe(
      pagination => {
        this.arguments = pagination.data;
      }
    );
  }
}
