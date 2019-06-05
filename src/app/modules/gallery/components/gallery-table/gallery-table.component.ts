import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { PaginationManager } from '@app/shared/classes/pagination-manager';
import { Notify } from '@app/shared/services/notify.service';
import { filter, mergeMap } from 'rxjs/operators';
import { Gallery } from '@app/api/models/gallery.model';
import { GalleryService } from '@app/api/services/gallery.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gallery-table',
  templateUrl: './gallery-table.component.html',
  styleUrls: ['./gallery-table.component.scss']
})
@AutoUnsubscribe()
export class GalleryTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'image', 'id', 'title', 'actions'
  ];

  paginationManager: PaginationManager<Gallery>;
  filterForm: FormGroup;
  sub = new SubscriptionManager();

  constructor(private galleryService: GalleryService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog) {
    this.filterForm = this.fb.group({
      with_trashed: []
    });
  }

  ngOnInit(): void {
    this.initPaginatorManager();
    this.sub.add = this.filterForm.valueChanges.subscribe(() => {
        this.initPaginatorManager();
      }
    );
  }

  private initPaginatorManager() {
    this.paginationManager = new PaginationManager<Gallery>(this.sort);
    this.paginationManager.change.pipe(
      mergeMap(pd => this.galleryService.get(pd.pagination, pd.order, this.filterForm.getRawValue()))
    ).subscribe(
      paginatedPeople => this.paginationManager.setPagination(paginatedPeople),
      error => this.notify.error(error)
    );
    this.paginationManager.init();
  }


  deleteCategory(gallery: Gallery) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: gallery.title} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.galleryService.delete(gallery.slug))
    ).subscribe(() => {
        if (this.filterForm.get('with_trashed').value) {
          gallery.deleted_at = '-';
        } else {
          this.paginationManager.removeElement(gallery);
        }
      },
      error => this.notify.error(error));
  }

  restoreCategory(gallery: Gallery) {
    this.galleryService.restore(gallery.slug).subscribe(
      (restoredGallery) => {
        gallery.replaceProperties(restoredGallery);
      },
      error => this.notify.error(error));
  }

}
