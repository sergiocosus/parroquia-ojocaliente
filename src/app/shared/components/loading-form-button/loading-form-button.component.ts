import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loading-form-button',
  templateUrl: './loading-form-button.component.html',
  styleUrls: ['./loading-form-button.component.scss']
})
export class LoadingFormButtonComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() type = 'submit';
  @Input() color = 'primary';

  constructor() {
  }

  ngOnInit() {
  }

}
