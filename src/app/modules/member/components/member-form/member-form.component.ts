import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Member } from '@app/api/models/member.model';
import { OrganizationService } from '@app/api/services/organization.service';
import { Observable } from 'rxjs';
import { Organization } from '@app/api/models/organization.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  @Input() theForm: FormGroup;
  @Input() member: Member;
  @Output() ngSubmit = new EventEmitter();
  $organizations: Observable<Organization[]>;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.$organizations = this.organizationService.get();
  }

}
