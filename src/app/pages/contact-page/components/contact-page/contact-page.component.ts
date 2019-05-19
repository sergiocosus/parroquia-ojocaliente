import { Component, OnInit } from '@angular/core';
import { SettingService } from '@app/api/services/setting.service';
import { ValidSetting } from '@app/api/models/setting.model';
import * as _ from 'lodash';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  contactText: string;

  constructor(private settingService: SettingService,
              private appMetaService: AppMetaService) {
  }

  ngOnInit() {
    this.settingService.getCachedSettings().subscribe(settings => {
      this.contactText = _.find(settings, {name: ValidSetting.contact})
        .content as string;

      this.appMetaService.update(extract('contact.contact'), this.contactText);
    });
  }

}
