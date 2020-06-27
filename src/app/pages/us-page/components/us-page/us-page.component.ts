import { Component, OnInit } from '@angular/core';
import { MemberService } from '@app/api/services/member.service';
import { Member } from '@app/api/models/member.model';

@Component({
  selector: 'app-us-page',
  templateUrl: './us-page.component.html',
  styleUrls: ['./us-page.component.scss']
})
export class UsPageComponent implements OnInit {
  members: Member[];

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
    this.memberService.get(null, null, null).subscribe(
      pagination => {
        this.members = pagination.data;
      }
    );
  }

}
