import { Component, OnInit } from '@angular/core';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit {

  constructor(private appMetaService: AppMetaService) { }

  ngOnInit() {
    this.appMetaService.update(extract('link.links'));
  }

}
