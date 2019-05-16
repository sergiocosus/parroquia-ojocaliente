import { Component, OnInit } from '@angular/core';
import { Category } from '@app/api/models/category.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@app/api/services/category.service';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';
import { filter, finalize, mergeMap, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
@AutoUnsubscribe()
export class CategoriesListComponent implements OnInit {
  categories: Category[];
  form: FormGroup;

  editForm: FormGroup;
  selectedCategory: Category;

  filterForm: FormGroup;

  sub = new SubscriptionManager();

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog) {
    this.form = this.fb.group({
      title: '',
    });

    this.editForm = this.fb.group({
      title: '',
    });

    this.filterForm = this.fb.group({
      with_trashed: []
    });

    this.sub.add = this.filterForm.valueChanges.pipe(
      startWith(true),
      mergeMap(() => this.categoryService.get(this.filterForm.getRawValue()))
    ).subscribe(
      categories => this.categories = categories
    );
  }

  ngOnInit() {
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
        this.form.reset();
      },
      error => this.notify.error(error)
    );
  }

  deleteCategory(category: Category) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: category.title} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.categoryService.delete(category.slug))
    ).subscribe(() => {
        if (this.filterForm.get('with_trashed').value) {
          category.deleted_at = '-';
        } else {
          this.categories.splice(this.categories.indexOf(category), 1);
        }
      },
      error => this.notify.error(error));
  }

  restoreCategory(category: Category) {
    this.categoryService.restore(category.slug).subscribe(
      (restoredCategory) => {
        category.replaceProperties(restoredCategory);
      },
      error => this.notify.error(error));
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
