import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubscriptionManager } from '../../../../shared/classes/subscription-manager';
import { Notify } from '../../../../shared/services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, mergeMap, startWith } from 'rxjs/operators';
import { extract } from '../../../../shared/services/i18n.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ContactResponse } from '../../../../modules/api/models/contact-response.model';
import { ContactResponseService } from '../../../../modules/api/services/contact-response.service';

@Component({
  selector: 'app-admin-contact-page',
  templateUrl: './admin-contact-page.component.html',
  styleUrls: ['./admin-contact-page.component.scss']
})
export class AdminContactPageComponent implements OnInit {
  contactResponses: ContactResponse[];
  selectedContactResponse: ContactResponse;

  filterForm: FormGroup;

  sub = new SubscriptionManager();

  constructor(private contactResponseService: ContactResponseService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog) {
    this.filterForm = this.fb.group({
      with_trashed: []
    });

    this.sub.add = this.filterForm.valueChanges.pipe(
      startWith(true),
      mergeMap(() => this.contactResponseService.get(this.filterForm.getRawValue()))
    ).subscribe(
      contact_responses => this.contactResponses = contact_responses
    );
  }

  ngOnInit() {

  }


  deleteContactResponse(contact_response: ContactResponse) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: contact_response.name} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(a => !!a),
      mergeMap(() => this.contactResponseService.delete(contact_response.id))
    ).subscribe(() => {
        if (this.filterForm.get('with_trashed').value) {
          contact_response.deleted_at = '-';
        } else {
          this.contactResponses.splice(this.contactResponses.indexOf(contact_response), 1);
        }
      },
      error => this.notify.error(error));
  }

  restoreContactResponse(contact_response: ContactResponse) {
    this.contactResponseService.restore(contact_response.id).subscribe(
      restoredContactResponse => {
        contact_response.replaceProperties(restoredContactResponse);
        this.notify.showTranslated(extract('form.updatedSuccess'));
      },
      error => this.notify.error(error));
  }

  selectToEditContactResponse(contactResponse: ContactResponse) {
    if (this.selectedContactResponse === contactResponse) {
      return;
    }

    this.selectedContactResponse = contactResponse;
  }
}
