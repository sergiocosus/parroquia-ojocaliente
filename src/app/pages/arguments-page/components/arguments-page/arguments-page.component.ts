import { Component, OnInit } from '@angular/core';
import { ArgumentService } from '@app/api/services/argument.service';
import { Argument } from '@app/api/models/argument.model';
import { CategoryService } from '@app/api/services/category.service';
import { Category } from '@app/api/models/category.model';

@Component({
  selector: 'app-arguments-page',
  templateUrl: './arguments-page.component.html',
  styleUrls: ['./arguments-page.component.scss']
})
export class ArgumentsPageComponent implements OnInit {
  arguments: Argument[];
  category: Category;

  constructor(private argumentService: ArgumentService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.argumentService.get(null, null, null).subscribe(
      pagination => {
        this.arguments = pagination.data;
      }
    );

    this.categoryService.getOne('argumentacion').subscribe(
      category => this.category = category
    );
  }

}
