import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { Notify } from '@app/shared/services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, finalize, mergeMap, startWith } from 'rxjs/operators';
import { extract } from '@app/shared/services/i18n.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { Organization } from '@app/api/models/organization.model';
import { OrganizationService } from '@app/api/services/organization.service';

@Component({
  selector: 'app-admin-organizations-page',
  templateUrl: './admin-organizations-page.component.html',
  styleUrls: ['./admin-organizations-page.component.scss']
})
export class AdminOrganizationsPageComponent implements OnInit {
  organizations: Organization[];
  form: FormGroup;

  editForm: FormGroup;
  selectedOrganization: Organization;

  filterForm: FormGroup;

  sub = new SubscriptionManager();

  constructor(private organizationService: OrganizationService,
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
      mergeMap(() => this.organizationService.get(this.filterForm.getRawValue()))
    ).subscribe(
      organizations => this.organizations = organizations
    );
  }

  private createForm() {
    return this.fb.group({
      name: [null, [Validators.required]],
      facebook: null,
      instagram: null,
      twitter: null,
      youtube: null,
      phone: null,
      email: null,
      address: null,
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
    this.organizationService.post(data).pipe(
      finalize(() => this.form.enable())
    ).subscribe(
      organization => {
        this.organizations.unshift(organization);
        this.form.reset();
      },
      error => this.notify.error(error)
    );
  }

  deleteOrganization(organization: Organization) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: organization.name} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(a => !!a),
      mergeMap(() => this.organizationService.delete(organization.id))
    ).subscribe(() => {
        if (this.filterForm.get('with_trashed').value) {
          organization.deleted_at = '-';
        } else {
          this.organizations.splice(this.organizations.indexOf(organization), 1);
        }
      },
      error => this.notify.error(error));
  }

  restoreOrganization(organization: Organization) {
    this.organizationService.restore(organization.id).subscribe(
      restoredOrganization => {
        organization.replaceProperties(restoredOrganization);
        this.notify.showTranslated(extract('form.updatedSuccess'));
      },
      error => this.notify.error(error));
  }

  selectToEditOrganization(organization: Organization) {
    if (this.selectedOrganization === organization){
      return;
    }

    this.selectedOrganization = organization;
    this.editForm.reset({
      name: organization.name,
      facebook: organization.facebook,
      instagram: organization.instagram,
      twitter: organization.twitter,
      youtube: organization.youtube,
      phone: organization.phone,
      email: organization.email,
      address: organization.address,
    });
  }

  editOrganization() {
    const data = this.editForm.getRawValue();
    this.organizationService.edit(this.selectedOrganization.id, data).subscribe(
      organization => {
        this.selectedOrganization.replaceProperties(organization);
        this.selectToEditOrganization(this.selectedOrganization);
        this.notify.showTranslated(extract('form.success'));
      },
      error => this.notify.error(error)
    );
  }
}
