import { NgModule } from '@angular/core';
import { ArgumentsTableComponent } from './components/arguments-table/arguments-table.component';
import { ArgumentFormDialogComponent } from './components/argument-form-dialog/argument-form-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PostModule } from '@app/post/post.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ArgumentsTableComponent, ArgumentFormDialogComponent],
  exports: [
    ArgumentsTableComponent
  ],
    imports: [
        SharedModule,
        MatSortModule,
        MatTableModule,
        MatProgressBarModule,
        PostModule,
        DragDropModule
    ],
  entryComponents: [
    ArgumentFormDialogComponent
  ]
})
export class ArgumentModule {
}
