import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@app/api/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/api/models/category.model';
import { AppMetaService } from '@app/shared/services/app-meta.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  private categorySlug: string;
  category: Category;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private metaService: AppMetaService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categorySlug = params.get('categorySlug');
      this.categoryService.getOne(this.categorySlug).subscribe(category => {
        this.category = category;
        this.metaService.update(this.category.title);
      });
    });
  }

}
