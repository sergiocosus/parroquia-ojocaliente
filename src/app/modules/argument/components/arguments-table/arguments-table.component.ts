import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationManager } from '@app/shared/classes/pagination-manager';
import { Argument } from '@app/api/models/argument.model';
import { ArgumentService } from '@app/api/services/argument.service';
import { Notify } from '@app/shared/services/notify.service';
import { filter, mergeMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ArgumentFormDialogComponent } from '@app/argument/components/argument-form-dialog/argument-form-dialog.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-arguments-table',
  templateUrl: './arguments-table.component.html',
  styleUrls: ['./arguments-table.component.scss']
})
export class ArgumentsTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = [
    'image', 'id', 'question', 'actions'
  ];

  paginationManager: PaginationManager<Argument>;

  constructor(private argumentService: ArgumentService,
              private notify: Notify,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initPaginatorManager();
  }

  stripTags(value) {
    return value.replace(/<[^>]*>/g, '');
  }

  private initPaginatorManager() {
    this.paginationManager = new PaginationManager<Argument>(this.sort);
    this.paginationManager.change.pipe(
      mergeMap(pd => this.argumentService.get(pd.pagination, pd.order, {is_published: 'false'}))
    ).subscribe(
      paginatedArgument => this.paginationManager.setPagination(paginatedArgument),
      error => this.notify.error(error)
    );
    this.paginationManager.init();
  }

  create() {
    this.dialog.open(ArgumentFormDialogComponent).afterClosed()
      .pipe(filter(a => !!a))
      .subscribe(argument => {
        this.paginationManager.appendElement(argument);
      });
  }

  update(argument: Argument) {
    this.dialog.open(ArgumentFormDialogComponent, {data: argument}).afterClosed()
      .pipe(filter(a => !!a))
      .subscribe(updatedArgument => {
        argument.replaceProperties(updatedArgument);
      });
  }


  drop(event: CdkDragDrop<string[]>) {
    const argumentElement = this.paginationManager.dataSource.data;

    if (event.currentIndex === event.previousIndex) {
      return;
    }

    this.argumentService.edit(event.item.data.id, {order: event.currentIndex}).subscribe();
    this.argumentService.edit(argumentElement[event.currentIndex].id, {order: event.previousIndex}).subscribe();

    const replaced = argumentElement[event.currentIndex];
    argumentElement[event.currentIndex] = argumentElement[event.previousIndex];
    argumentElement[event.previousIndex] = replaced;

    this.paginationManager.refresh();
  }
}
