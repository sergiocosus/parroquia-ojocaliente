import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';
import { filter, finalize, mergeMap, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { Link } from '@app/api/models/link.model';
import { LinkService } from '@app/api/services/link.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
@AutoUnsubscribe()
export class LinkListComponent implements OnInit {
  links: Link[];
  form: FormGroup;

  editForm: FormGroup;
  selectedLink: Link;

  filterForm: FormGroup;

  sub = new SubscriptionManager();

  constructor(private linkService: LinkService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog) {
    this.form = this.createForm();
    this.editForm = this.createForm();

    this.filterForm = this.fb.group({
      with_trashed: []
    });

    this.sub.add = this.filterForm.valueChanges.pipe(
      startWith(true),
      mergeMap(() => this.linkService.get(null, null, this.filterForm.getRawValue()))
    ).subscribe(
      links => this.links = links.data
    );
  }

  private createForm() {
    return this.fb.group({
      title: '',
      url: '',
      description: ' ',
    });
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
    this.linkService.post(data).pipe(
      finalize(() => this.form.enable())
    ).subscribe(
      link => {
        this.links.unshift(link);
        this.form.reset();
      },
      error => this.notify.error(error)
    );
  }

  deleteLink(link: Link) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: link.title} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.linkService.delete(link.id))
    ).subscribe(() => {
        if (this.filterForm.get('with_trashed').value) {
          link.deleted_at = '-';
        } else {
          this.links.splice(this.links.indexOf(link), 1);
        }
      },
      error => this.notify.error(error));
  }

  restoreLink(link: Link) {
    this.linkService.restore(link.id).subscribe(
      restoredLink => {
        link.replaceProperties(restoredLink);
        this.notify.showTranslated(extract('form.updatedSuccess'));
      },
      error => this.notify.error(error));
  }

  selectToEditLink(link: Link) {
    this.selectedLink = link;
    this.editForm.reset({
      title: link.title,
      url: link.url,
      description: link.description,
    });
  }

  editLink() {
    const data = this.editForm.getRawValue();
    this.linkService.edit(this.selectedLink.id, data).subscribe(
      link => {
        this.selectedLink.replaceProperties(link);
        this.selectToEditLink(this.selectedLink);
        this.notify.showTranslated(extract('form.success'));
      },
      error => this.notify.error(error)
    );
  }
}
