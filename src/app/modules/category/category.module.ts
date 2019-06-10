import { NgModule } from '@angular/core';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CategoriesSearchChipListComponent } from './components/categories-search-chip-list/categories-search-chip-list.component';
import { MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  declarations: [CategoriesListComponent, CategoriesSearchChipListComponent],
  imports: [
    SharedModule,
    MatChipsModule,
    MatAutocompleteModule,
    ShareButtonsModule,
  ],
  exports: [
    CategoriesListComponent,
    CategoriesSearchChipListComponent,
  ]
})
export class CategoryModule {
}
