import { Component, Input, OnInit } from '@angular/core';
import { Organization } from '@app/api/models/organization.model';

@Component({
  selector: 'app-organization-social-links',
  templateUrl: './organization-social-links.component.html',
  styleUrls: ['./organization-social-links.component.scss']
})
export class OrganizationSocialLinksComponent implements OnInit {
  @Input() organization: Organization;

  constructor() {
  }

  ngOnInit(): void {
  }

}
