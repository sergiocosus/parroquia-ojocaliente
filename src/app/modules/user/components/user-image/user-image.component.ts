import { Component, Input, OnInit } from '@angular/core';
import { User } from '@app/api/models/user.model';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
