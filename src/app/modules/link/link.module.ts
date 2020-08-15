import { NgModule } from '@angular/core';
import { LinkListComponent } from './component/link-list/link-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { LinkFormComponent } from './component/link-form/link-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryModule } from '../category/category.module';

@NgModule({
  declarations: [LinkListComponent, LinkFormComponent],
  exports: [
    LinkListComponent,
  ],
    imports: [
        SharedModule,
        MatExpansionModule,
        CategoryModule,
    ]
})
export class LinkModule {
}
