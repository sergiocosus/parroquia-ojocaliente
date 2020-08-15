import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '@app/api/services/organization.service';
import { Organization } from '@app/api/models/organization.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  $organization: Observable<Organization>;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.$organization = this.organizationService.getOne('juvi-nacional');
  }

}
