import { Component, OnInit, ViewChild } from '@angular/core';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginationManager } from '@app/shared/classes/pagination-manager';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { Notify } from '@app/shared/services/notify.service';
import { mergeMap } from 'rxjs/operators';
import { UserService } from '@app/api/services/user.service';
import { User } from '@app/api/models/user.model';
import { RoleService } from '@app/api/services/role.service';
import { Role } from '@app/api/models/role.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
@AutoUnsubscribe()
export class UsersTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = [
    'image', 'id', 'full_name', 'actions'
  ];

  paginationManager: PaginationManager<User>;
  filterForm: FormGroup;
  sub = new SubscriptionManager();
  roles: Role[];

  constructor(private userService: UserService,
              private roleService: RoleService,
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

    this.roleService.get().subscribe(roles => this.roles = roles);
  }

  private initPaginatorManager() {
    this.paginationManager = new PaginationManager<User>(this.sort);
    this.paginationManager.change.pipe(
      mergeMap(pd => this.userService.get(pd.pagination, pd.order, this.filterForm.getRawValue()))
    ).subscribe(
      paginatedUsers => this.paginationManager.setPagination(paginatedUsers),
      error => this.notify.error(error)
    );
    this.paginationManager.init();
  }


  /*
  deleteCategory(gallery: Gallery) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: gallery.title} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(a => !!a),
      mergeMap(() => this.userService.delete(gallery.slug))
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
    this.userService.restore(gallery.slug).subscribe(
      (restoredGallery) => {
        gallery.replaceProperties(restoredGallery);
      },
      error => this.notify.error(error));
  }
   */

}
