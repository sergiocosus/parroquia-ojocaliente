import { Component, OnInit } from '@angular/core';
import { Category } from '@app/api/models/category.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@app/api/services/category.service';
import { Notify } from '@app/shared/service/notify.service';
import { extract } from '@app/shared/service/i18n.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];
  form: FormGroup;

  editForm: FormGroup;
  selectedCategory: Category;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private notify: Notify) {
  }

  ngOnInit() {
    this.categoryService.get().subscribe(
      categories => this.categories = categories
    );

    this.form = this.fb.group({
      title: '',
    });

    this.editForm = this.fb.group({
      title: '',
    });
  }


  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();
    this.form.disable();
    this.categoryService.post(data).pipe(
      finalize(() => this.form.enable())
    ).subscribe(
      category => {
        this.categories.unshift(category);
      },
      error => this.notify.error(error)
    );
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.slug).subscribe(() => {
        this.categories.splice(this.categories.indexOf(category), 1);
      }
    );
  }

  selectToEditCategory(category: Category) {
    this.selectedCategory = category;
    this.editForm.reset({title: category.title});
  }

  editCategory() {
    if (this.selectedCategory) {
      const data = this.editForm.getRawValue();
      this.categoryService.edit(this.selectedCategory.slug, data).subscribe(
        category => {
          this.selectedCategory.replaceProperties(category);
          this.selectedCategory = null;
          this.notify.showTranslated(extract('form.success'));
        },
        error => this.notify.error(error)
      );
    }
  }
}
