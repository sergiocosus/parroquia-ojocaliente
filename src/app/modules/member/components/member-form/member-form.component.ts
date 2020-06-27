import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Member } from '@app/api/models/member.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  @Input() theForm: FormGroup;
  @Input() member: Member;
  @Output() ngSubmit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
