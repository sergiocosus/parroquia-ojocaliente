import { Component, OnInit } from '@angular/core';
import { SettingService } from '@app/api/services/setting.service';
import { ValidSetting } from '@app/api/models/setting.model';
import * as _ from 'lodash';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { extract } from '@app/shared/services/i18n.service';
import { OrganizationService } from '@app/api/services/organization.service';
import { Organization } from '@app/api/models/organization.model';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  contactText: string;

  groups = [
    {
      title: 'JUVI Nacional',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvi_ac',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'juvioficial',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'facebook',
          name: 'Juvi.ac',
        }
      ],
    },
    {
      title: 'JUVI Culiacán',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvi_sinaloa',
        },
      ],
    },
    {
      title: 'JUVI Mérida',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvimid',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'JuviMid',
        },
      ],
    },
    {
      title: 'JUVI Mérida',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvimid',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'JuviMid',
        }
      ],
    },
    {
      title: 'JUVI Puebla',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvi.puebla',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'JuviPuebla',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'facebook',
          name: 'Juvi Puebla',
        }
      ],
    },
    {
      title: 'JUVI Querétaro',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvi.queretaro',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'JuviQueretaro',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'facebook',
          name: 'Juvi Queretaro',
        }
      ],
    },
    {
      title: 'JUVI Monterrey',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvi.mty',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'JuviMty',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'facebook',
          name: 'Juvi Mty',
        }
      ],
    },
    {
      title: 'JUVI Chihuahua',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvichihuahua',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'chihuahuajuvi',
        },
      ],
    },
    {
      title: 'JUVI Guadalajara',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juvi.gdl',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'guadaljarajuvi',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'facebook',
          name: 'Juvi Guadalajara',
        }
      ],
    },
    {
      title: 'JUVI Aguascalientes',
      contacts: [
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'instagram',
          name: 'juviaguas',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'twitter',
          name: 'JuviAguas',
        },
        {
          link: 'https://www.facebook.com/JUVI.AC',
          type: 'facebook',
          name: 'Juvi Aguascalientes',
        }
      ],
    },
  ];
  organizations: Organization[];

  constructor(private settingService: SettingService,
              private appMetaService: AppMetaService,
              private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.settingService.getCachedSettings().subscribe(settings => {
      this.contactText = _.find(settings, {name: ValidSetting.contact})
        .content as string;

      this.appMetaService.update(extract('contact.contact'), this.contactText);
    });

    this.organizationService.get().subscribe(organizations => this.organizations = organizations);
  }

}
