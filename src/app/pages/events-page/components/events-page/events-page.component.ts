import { Component, OnInit } from '@angular/core';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {

  constructor(private appMetaService: AppMetaService) {
  }

  ngOnInit(): void {
    this.appMetaService.update(extract('contact.contact'));
  }

}

