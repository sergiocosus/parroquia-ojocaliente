import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '@app/api/services/setting.service';
import { ValidSetting } from '@app/api/models/setting.model';
import * as _ from 'lodash';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { extract } from '@app/shared/services/i18n.service';
import { OrganizationService } from '@app/api/services/organization.service';
import { Organization } from '@app/api/models/organization.model';
import { ContactResponseService } from '@app/api/services/contact-response.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Notify } from '@app/shared/services/notify.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  @ViewChild('ngForm') ngForm: NgForm;

  contactText: string;
  organizations: Organization[];
  form: FormGroup;
  submitSuccess: boolean;

  constructor(private settingService: SettingService,
              private appMetaService: AppMetaService,
              private organizationService: OrganizationService,
              private contactResponseService: ContactResponseService,
              private fb: FormBuilder,
              private notify: Notify) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      phone: null,
      email:  [null, [Validators.required, Validators.email]],
      subject: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.settingService.getCachedSettings().subscribe(settings => {
      this.contactText = _.find(settings, {name: ValidSetting.contact})
        .content as string;

      this.appMetaService.update(extract('contact.contact'), this.contactText);
    });

    this.organizationService.get().subscribe(organizations => this.organizations = organizations);
  }


  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();
    this.form.disable();
    this.contactResponseService.post(data).pipe(
      finalize(() => this.form.enable())
    ).subscribe(
      success => {
        this.submitSuccess = true;
        this.ngForm.resetForm();
        this.notify.showTranslated(extract('contactResponse.success'));
      },
      error => this.notify.error(error)
    );
  }
}
